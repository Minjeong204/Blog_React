import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";

function Post(props) {
    const { posts, title } = props;
    const arr = [];
    for (var i = 0; i < posts.length; i++) {
        arr.push({ post: posts[i], title: title[i] });
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item height={1000} xs={12} md={12}>
            {arr.map((po) => {
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
                            {po.title}
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
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                    <Divider />
                    <p dangerouslySetInnerHTML={{ __html: po.post }}></p>
                </Box>;
            })}
        </Grid>
    );
}

Post.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Post;
