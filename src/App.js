import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import NotFound from "./Component/NotFound";
import Regist from "./Page/Regist";
import SignInSide from "./Page/Signin";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Blog from "./Page/Main";
import Write from "./Component/Writing";
import Writing from "./Page/Write";
function App() {
  const sections = [
    { title: "일기", url: "#" },
    { title: "노래추천", url: "#" },
    { title: "독후감", url: "#" },
    { title: "코딩공부", url: "#" },
    { title: "맛집추천", url: "#" },
  ];
  const theme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header sections={sections} />
          <Routes>
            <Route path="/signup" element={<Regist />}></Route>
            <Route path="/signin" element={<SignInSide />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/write" element={<Writing />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
