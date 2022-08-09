import React, { useEffect, useState } from "react";
import API from "../../api/api.js";
import Card from "../../components/Card.jsx";

import { Container } from "./History.styled.js";

const History = () => {
  const [videos, setVideos] = useState([]);

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
      {videos.length > 0 ? (
        videos.map((video) => <Card key={video.id} video={video} />)
      ) : (
        <h1>No videos in your history </h1>
      )}
    </Container>
  );
};

export default History;
