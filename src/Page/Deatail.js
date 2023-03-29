import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MainFeaturedPost from "../Component/MainFeaturedPost";
import FeaturedPost from "../Component/FeaturedPost";
import Main from "../Component/Content";
import { request } from "../Axios";
import Sidebar from "../Component/Sidebar";
import { useParams } from "react-router-dom";
import Post from "../Component/Post";

export default function Detail() {
    const [posts, setPost] = useState([]);
    const [title, setTitle] = useState([]);

    const { category } = useParams();

    useEffect(() => {
        request
            .get(`/blog/${category}`)
            .then(function (response) {
                const post = [];
                const titles = [];
                response.data.map((p) => post.push(p.content));
                response.data.map((p) => titles.push(p.title));
                setTitle(titles);
                setPost(post);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);
    return (
        <main>
            <Grid container spacing={5} sx={{ mt: 3 }} md={12} item>
                <Post title={title} posts={posts} />
            </Grid>
        </main>
    );
}
