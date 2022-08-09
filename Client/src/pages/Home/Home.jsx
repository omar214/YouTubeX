import { Container } from "./Home.styled.js";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import API from "../../api/api.js";

import { useSelector, useDispatch } from "react-redux";
// import { userSlice } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fecthData = async () => {
      let url = "";
      if (type === "random") {
        url = "/videos";
      } else if (type === "trend") {
        url = "/videos/trend";
      } else if (type === "subscribes") {
        // TODO: GET SUBSCRIBES
        url = "/videos/subscribes";
        if (!currentUser) navigate("/signin");
      } else if (type === "library") {
        url = "/videos/saved";
        if (!currentUser) navigate("/signin");
      }

      try {
        const res = await API.get(url);
        console.log(res.data);
        setVideos(res.data.videos);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthData();
  }, [type, currentUser, navigate]);

  return (
    <Container>
      {type === "subscribes" && !currentUser && navigate("/signin")}
      {videos && videos.map((video) => <Card key={video._id} video={video} />)}
      {type === "library" && (videos?.length === 0 || !videos) && (
        <div>
          <h1>You have no Saved videos in your library</h1>
          <p> Go to your library and add some videos</p>
        </div>
      )}
      {type === "subscribes" && (videos?.length === 0 || !videos) && (
        <div>
          <h1>You didn`t subscripe any channel</h1>
          {/* <p> you can </p> */}
        </div>
      )}
    </Container>
  );
};

export default Home;
