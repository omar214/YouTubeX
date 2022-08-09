import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../api/api.js";
import Card from "../../components/Card.jsx";

import { Container } from "./Search.styled.js";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    console.log("search route", query);
    const fetchVideos = async () => {
      try {
        const res = await API.get(`/videos/search${query}`);
        setVideos(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.length > 0 ? (
        videos.map((video) => <Card key={video.id} video={video} />)
      ) : (
        <h1>No videos found </h1>
      )}
      {/* {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))} */}
    </Container>
  );
};

export default Search;
