import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice.js";

// import styles
import {
  Container,
  Wrapper,
  Search,
  Input,
  Button,
  Avatar,
} from "../styles/Navbar.styled.js";
import { useState } from "react";
import Upload from "../components/Upload.jsx";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/signin");
  };
  const handleSearch = (e) => {
    if (!query) return;

    navigate(`/search?q=${query}`);
  };

  const handleOpenSidebar = (e) => {
    // e.preventDefault();
    console.log("open sidebar");
    const bar = document.getElementById("mySidenav");
    console.log(bar);
    if (bar.style.width === "250px") {
      bar.style.width = "0";
    } else {
      bar.style.width = "250px";
    }
    // document.getElementById("main").style.marginLeft = "250px";
  };

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={(e) => e.keyCode === 13 && handleSearch()}
          />
          <SearchOutlinedIcon
            // onClick={handleSearch}
            onCLick={() => handleOpenSidebar()}
          />
        </Search>
        {!currentUser ? (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => handleOpenSidebar()}
          >
            <VideoCallOutlinedIcon
              style={{ marginRight: "10px", fontSize: "30px" }}
              onClick={() => setIsUploadOpen((prev) => !prev)}
            />
            <Button type="logOut" onClick={handleLogOut}>
              Log out
            </Button>
            <Avatar src={currentUser.img} />
            {currentUser.email}
          </div>
        )}
        {isUploadOpen && <Upload setOpen={setIsUploadOpen} />}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
