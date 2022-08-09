// import icons
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";

import userAvatar from "../../assets/avatar.jpg";

import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import moment from "moment";
// import Components
import Comments from "../../components/Comments.jsx";
import Card from "../../components/Card.jsx";

// import Styles
import {
  Container,
  Content,
  VideoWrapper,
  Title,
  Details,
  Info,
  Buttons,
  Button,
  Hr,
  Recommendation,
  Channel,
  ChannelInfo,
  Image,
  ChannelDetail,
  ChannelName,
  ChannelCounter,
  Description,
  Subscribe,
} from "./Video.styled.js";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import API from "../../api/api.js";
import {
  fetchVideoStart,
  fetchVideoSuccess,
  fetchVideoFailure,
  likeVideo,
  dislikeVideo,
  saveVideo,
  subscribeChannel,
} from "../../redux/videoSlice.js";
import {
  userLikeVideo,
  userDislikeVideo,
  userSaveVideo,
  userSubscribeChannel,
} from "../../redux/userSlice.js";

const Video = () => {
  // get current user
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id: videoId } = useParams();
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      dispatch(fetchVideoStart());
      console.log("start");
      try {
        const res = await API.get(`/videos/find/${videoId}`);
        dispatch(
          fetchVideoSuccess({
            currentVideo: res.data,
            currentUser,
          })
        );
        await API.put(`/videos/view/${videoId}`);
        await API.put(`/videos/history/${videoId}`);
      } catch (error) {
        dispatch(fetchVideoFailure());
      }
    };
    // todo add tags and make make reccommendations via tags
    const fetchRecommends = async () => {
      try {
        const res = await API.get(`/videos`);
        setRecommends(res.data.videos.filter((video) => video._id !== videoId));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVideo();
    fetchRecommends();
    // }, [videoId, currentUser]);
  }, [videoId]);

  const handleLike = async (e) => {
    e.preventDefault();
    !currentUser && navigate("/signin");
    try {
      dispatch(likeVideo(currentUser.likedVideos.includes(currentVideo._id)));
      dispatch(userLikeVideo(videoId));
      await API.put(`users/like/${videoId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    console.log(
      currentUser?.subscripedChannels?.includes(currentVideo.userId._id)
    );

    !currentUser && navigate("/signin");
    try {
      dispatch(
        dislikeVideo(currentUser.dislikedVideos.includes(currentVideo._id))
      );
      dispatch(userDislikeVideo(videoId));
      await API.put(`users/dislike/${videoId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    !currentUser && navigate("/signin");
    try {
      dispatch(userSaveVideo(videoId));
      await API.put(`users/save/${videoId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
    !currentUser && navigate("/signin");
    try {
      dispatch(userSubscribeChannel(currentVideo.userId._id));
      dispatch(
        subscribeChannel(
          currentUser.subscripedChannels.includes(currentVideo.userId._id)
        )
      );
      await API.put(`users/subscribe/${currentVideo.userId._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Content>
        {currentVideo?.loading ? (
          <CircularProgress
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        ) : (
          <>
            <VideoWrapper>
              {/* <video src="/videos/1.mp4" controls style={{ width: "100%" }} /> */}
              <video
                src={currentVideo.videoUrl}
                controls
                autoPlay
                style={{ width: "100%", height: "100%", outline: "none" }}
              />
            </VideoWrapper>
            <Title>{currentVideo?.title}</Title>
            <Description>{currentVideo?.desc} </Description>
            <Details>
              <Info>
                <div>{currentVideo ? currentVideo.views : 0} views • </div>
                <div>
                  {currentVideo
                    ? moment(currentVideo.createdAt).fromNow()
                    : "Jun 22,2022"}
                </div>
              </Info>
              <Buttons>
                <Button onClick={handleLike}>
                  {currentUser?.likedVideos?.includes(currentVideo._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                  {currentVideo?.likes || 0}
                </Button>
                <Button onClick={handleDislike}>
                  {currentUser.dislikedVideos.includes(currentVideo._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                  {currentVideo?.dislikes || 0}
                </Button>
                <Button>
                  <ReplyOutlinedIcon /> Share
                </Button>
                <Button onClick={handleSave}>
                  {currentUser.savedVideos.includes(currentVideo._id) ? (
                    <LibraryAddIcon />
                  ) : (
                    <LibraryAddOutlinedIcon />
                  )}
                  Save
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                {/* <userAvatar /> */}
                <Image
                  src={
                    currentVideo?.userId?.img
                      ? currentVideo.userId.img
                      : userAvatar
                  }
                  alt="avatar"
                />
                {/* <img /> */}
                <ChannelDetail>
                  <ChannelName>{currentVideo?.userId.name}</ChannelName>
                  <ChannelCounter>
                    {currentVideo?.userId.subscripers} subscribers
                  </ChannelCounter>
                </ChannelDetail>
              </ChannelInfo>
              <Subscribe onClick={handleSubscribe}>
                {currentUser?.subscripedChannels?.includes(
                  currentVideo.userId._id
                )
                  ? "UN SUBSCRIBE"
                  : "SUBSCRIBE"}
              </Subscribe>
            </Channel>
            <Hr />
            <Comments />
          </>
        )}
      </Content>
      <Hr type={true} />
      <Recommendation>
        {recommends &&
          recommends.map((item) => {
            return <Card type="sm" key={item._id} video={item} />;
          })}
      </Recommendation>
    </Container>
  );
};

export default Video;
