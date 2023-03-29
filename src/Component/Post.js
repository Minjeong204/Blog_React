import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/system";

function Post(props) {
    const { posts, title } = props;
    const arr = [{ post: "", title: "" }];
    console.log(posts[0]);
    for (var i = 0; i < posts.length; i++) {
        arr.push({ post: posts[i], title: title[i] });
    }
    arr.shift();
    console.log(arr);
    return (
        <Grid
            item
            height={1000}
            xs={12}
            md={12}
            sx={{
                "& .markdown": {
                    py: 3,
                },
            }}>
            {arr.map((po) => (
                <Box
                    sx={{
                        height: 400,
                        border: "1px solid #cccccc",
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginBottom: 2,
                    }}
                    key={uuidv4()}>
                    <h2 className="title" key={uuidv4()}>
                        {po.title}
                    </h2>
                    <Divider key={uuidv4()} />
                    <p key={uuidv4()}>{po.post}</p>
                </Box>
            ))}
        </Grid>
    );
}

Post.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Post;
