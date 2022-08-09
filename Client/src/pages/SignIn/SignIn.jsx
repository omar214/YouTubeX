import { useRef, useState } from "react";
import API from "../../api/api.js";
import {
  Container,
  Wrapper,
  Title,
  SubTitle,
  Input,
  Button,
  More,
  Links,
  Link,
  Form,
} from "./Singin.styled.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/userSlice.js";

const SignIn = () => {
  const logInRef = useRef();
  const signUpRef = useRef();
  const [signUpError, setSignUpError] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [loginError, setLoginError] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = logInRef.current.email.value.trim();
    const password = logInRef.current.password.value.trim();

    let err = { email: "", password: "" };
    if (email === "") err.email = "Please enter your user name";
    if (password === "") err.password = "Please enter your password";
    if (err.email || err.password) return setLoginError(err);

    // make request
    dispatch(loginStart());
    try {
      const { data: res } = await API.post("/auth/login", { email, password });
      console.log(res.token);
      setLoginError({ email: "", password: "" });
      logInRef.current.reset();
      localStorage.setItem("access-token", res.token);

      dispatch(loginSuccess(res.user));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure("Invalid email or password"));
      const status = err.response.status;
      if (status === 401) {
        setLoginError({
          email: "",
          password: "Invalid email or password",
        });
      } else if (status === 404)
        setLoginError({ email: "", password: "User not found" });

      console.log(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const email = signUpRef.current.email.value.trim();
    const userName = signUpRef.current.userName.value.trim();
    const password = signUpRef.current.password.value.trim();

    let err = { email: "", password: "", userName: "" };
    if (email === "") err.email = "Please enter your user name";
    if (password === "") err.password = "Please enter your password";
    if (userName === "") err.userName = "Please enter your userName";
    if (err.email || err.password || err.userName) return setSignUpError(err);

    // make request
    try {
      const res = await API.post("/auth/signup", {
        email,
        password,
        name: userName,
      });
      console.log(res);
      setSignUpError({ email: "", password: "", userName: "" });
      signUpRef.current.reset();
      navigate("/");
    } catch (error) {
      if (err.response.status === 409) {
        setSignUpError((prev) => ({
          ...prev,
          email: "Email already exists",
        }));
      }
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>

        <Form ref={logInRef} onSubmit={handleLogin}>
          <Input name="email" placeholder="email" />
          <Input name="password" type="password" placeholder="password" />
          <Button>Sign in</Button>
        </Form>
        {loginError && loginError.email}
        <br />
        {loginError && loginError.password}

        <Title>or</Title>
        <Form ref={signUpRef} onSubmit={handleSignUp}>
          <Input name="userName" placeholder="username" />
          <Input name="email" placeholder="email" />
          <Input name="password" type="password" placeholder="password" />
          <Button>Sign up</Button>
        </Form>
        {signUpError && signUpError.email}
        <br />
        {signUpError && signUpError.userName}
        <br />
        {signUpError && signUpError.password}
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
