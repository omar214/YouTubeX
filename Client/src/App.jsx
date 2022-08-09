import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import styles
import { darkTheme, lightTheme } from "./utils/Theme";
import GlobalStyle from "./styles/global.styled.js";
import { Container, Main, Wrapper } from "./styles/app.styled.js";
// import components & pages
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home.jsx";
import Video from "./pages/Video/Video.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Search from './pages/search/Search.jsx';
import History from './pages/history/History.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <GlobalStyle />
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trend" element={<Home type="trend" />} />
                  <Route path="library" element={<Home type="library" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="history" element={<History />} />
                  <Route
                    path="subscribes"
                    element={<Home type="subscribes" />}
                  />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
