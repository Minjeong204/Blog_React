import * as React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { request } from "../Axios";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Modify from "../Page/Modify";

export default function Post(props) {
    const { post, id } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const delete2 = () => {
        const prom = window.confirm("정말 삭제하시겠습니까?");
        if (prom) {
            request
                .post(
                    "/delete",
                    {
                        postId: id,
                    },
                    {
                        headers: { "Content-Type": `application/json` },
                    }
                )
                .then(function (response) {
                    alert("삭제 성공");

                    window.location.href = "/blog";
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };

    return (
        <Grid item height={420} xs={12} md={12}>
            <Box
                sx={{
                    height: 400,
                    border: "1px solid #cccccc",
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2,
                }}>
                <div>
                    <h2 className="title" style={{ display: "inline-block" }}>
                        {post.title}
                    </h2>
                    <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{
                            float: "right",
                            marginTop: 2,
                        }}>
                        <MoreHorizIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}>
                        <MenuItem>
                            <Link to={`/modify/${id}`}>수정</Link>
                        </MenuItem>
                        <MenuItem onClick={delete2}>삭제</MenuItem>
                    </Menu>
                </div>

                <Divider />
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </Box>
        </Grid>
    );
}
