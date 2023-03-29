import { React, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Person";
import Create from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Header(props) {
    const [isLogin, setIsLogin] = useState(false); //로그인 관리
    const { sections } = props;
    useEffect(() => {
        if (sessionStorage.getItem("name") === null) {
            // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
            console.log("isLogin ?? :: ", isLogin);
        } else {
            // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
            // 로그인 상태 변경
            setIsLogin(true);
            console.log("isLogin ?? :: ", isLogin);
        }
    }, []);
    const logout = () => {
        sessionStorage.clear();
        window.location.reload();
    };
    return (
        <Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                {isLogin ? (
                    <p>
                        <Create />
                        <Link to="/write">글쓰기</Link>
                    </p>
                ) : (
                    <p></p>
                )}

                <Typography component="h2" variant="h5" color="inherit" align="center" nowrap="true" sx={{ flex: 1 }}>
                    <Link to="/blog">BLOG</Link>
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                {/* 로그인이 되어있다면 */}
                {isLogin ? (
                    <span>
                        {sessionStorage.getItem("name") + "님"}
                        <Button onClick={logout}>로그아웃</Button>
                    </span>
                ) : (
                    <Link to={`/Signin`} className="nav-link text-white">
                        로그인
                    </Link>
                )}
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: "space-between", overflowX: "auto" }}>
                {sections.map((section) => (
                    <a
                        color="inherit"
                        nowrap="true"
                        key={section.title}
                        variant="body2"
                        href={`/blog/${section.title}`}
                        sx={{ p: 1, flexShrink: 0 }}>
                        {section.title}
                    </a>
                ))}
            </Toolbar>
        </Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Header;
