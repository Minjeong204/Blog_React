import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/system";

function Main(props) {
    const { post } = props;
    return (
        <Box
            sx={{
                height:250,
                border: "1px solid #cccccc",
                paddingLeft: 5,
                paddingRight: 5,
                marginBottom: 2,
            }}>
            <div>
                <h2 className="title" style={{ display: "inline-block" }}>
                    {post.title}
                </h2>
            </div>

            <Divider />
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </Box>
    );
}

export default Main;
