import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import NotFound from "./Component/NotFound";
import Regist from "./Page/Regist";
import SignInSide from "./Page/Signin";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Blog from "./Page/Main";
import Writing from "./Page/Write";
import Detail from "./Page/Detail";
import Modify from "./Page/Modify";
import Footer from "./Component/Footer";

function App() {
    const sections = [
        { title: "diary", url: "/blog/diary" },
        { title: "song", url: "/song" },
        { title: "book", url: "/book" },
        { title: "study", url: "/study" },
        { title: "deli", url: "/deli" },
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
                        <Route path="/blog/:category" element={<Detail />}></Route>
                        <Route path="/write" element={<Writing />}></Route>
                        <Route path="/modify/:id" element={<Modify />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </Container>
                <Footer title="Footer" description="Something here to give the footer a purpose!" />
            </ThemeProvider>
        </div>
    );
}

export default App;
