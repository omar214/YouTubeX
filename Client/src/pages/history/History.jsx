import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../api/api.js";
import Card from "../../components/Card.jsx";

import { Container } from "./History.styled.js";

const History = () => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/signin");
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get(`/videos/history`);
        setVideos(res.data.videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <Container>
      {!currentUser ? (
        navigate("/signin")
      ) : videos.length > 0 ? (
        videos.map((video) => <Card key={video.id} video={video} />)
      ) : (
        <h1>No videos in your history </h1>
      )}
    </Container>
  );
};

export default History;
