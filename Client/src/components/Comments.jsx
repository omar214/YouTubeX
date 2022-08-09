// import styles
import {
  Container,
  NewComment,
  Avatar,
  Input,
} from "../styles/Comments.styled.js";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import API from "../api/api.js";
import { useSelector } from "react-redux";

import userAvatar from "../assets/avatar.jpg";

const Comments = () => {
  let { id: videoId } = useParams();
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await API.get(`/comments/${videoId}`);
        setComments(res.data.comments);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const { value: commentValue } = e.target.comment;
    if (!commentValue) return;
    console.log(localStorage.getItem("access-token"));
    // return;

    try {
      const res = await API.post(`/comments/${videoId}`, {
        desc: commentValue,
      });


      console.log("comment", res.data.comment);
      setComments((prev) => [res.data.comment, ...prev]);
      e.target.reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (e, commentId) => {
    e.preventDefault();
    try {
      const res = await API.delete(`/comments/${commentId}`);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      {currentUser && (
        <NewComment>
          <Avatar src={currentUser?.img || userAvatar} />
          <form onSubmit={handleAddComment}>
            <Input name="comment" placeholder="Add a comment..." />
          </form>
        </NewComment>
      )}
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          data={comment}
          userID={comment.userId}
          isOwner={
            currentUser?._id === comment?.userId._id ||
            currentUser?._id === comment?.userId
          }
          handleDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default Comments;
