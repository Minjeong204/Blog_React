import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { request } from "../Axios";
import { useParams } from "react-router-dom";
import Post from "../Component/Post";

export default function Detail() {
    const { category } = useParams();
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        request
            .get(`/blog/${category}`)
            .then((response) => {
                const newPosts = response.data.map((post) => ({
                    id: post.postId,
                    title: post.title,
                    content: post.content,
                }));
                setPosts(newPosts);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [category]);

    return (
        <main>
            <Grid container spacing={5} sx={{ mt: 3 }} md={12} item>
                {posts &&
                    posts.map((post) => {
                        return <Post key={post.title} post={post} id={post.id} />;
                    })}
            </Grid>
        </main>
    );
}
