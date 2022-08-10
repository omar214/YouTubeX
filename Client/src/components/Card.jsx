import { Link } from "react-router-dom";
import {
  Container,
  Image,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
} from "../styles/Card.styled.js";
import moment from "moment";

// import userAvatar from "../assets/avatar.jpg";
import thumbnail from "../assets/thumbnail.jpg";

const Card = ({ type, video }) => {
  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video?.imgUrl ? video?.imgUrl : thumbnail} />
        <Details type={type}>
          <ChannelImage
            type={type}
            // src={video?.userId?.img ? video?.userId?.img : userAvatar}
            src={video?.userId?.img }
          />
          <Texts>
            <Title>{video ? video.title : "Test Video"}</Title>
            <ChannelName>
              {
                video.userId.name
                // : "channel name"}
              }
            </ChannelName>
            <Info>
              {video ? video.views : "660,908 "} views •
              {video ? moment(video.createdAt).fromNow() : "1 day ago"}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
