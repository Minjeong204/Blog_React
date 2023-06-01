import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import MainFeaturedPost from "../Component/MainFeaturedPost";
import Main from "../Component/Content";
import { request } from "../Axios";
import Sidebar from "../Component/Sidebar";

const mainFeaturedPost = {
    title: "Hello World",
    description: "I LIKE COOKIES",
    image: "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg",
    imageText: "main image description",
};

const sidebar = {
    title: "About",
    description: "나의 블로그... 한 번 해봄...ㅎ",
    archives: [
        { title: "March 2020", url: "#" },
        { title: "February 2020", url: "#" },
        { title: "January 2020", url: "#" },
        { title: "November 1999", url: "#" },
        { title: "October 1999", url: "#" },
        { title: "September 1999", url: "#" },
        { title: "August 1999", url: "#" },
        { title: "July 1999", url: "#" },
        { title: "June 1999", url: "#" },
        { title: "May 1999", url: "#" },
        { title: "April 1999", url: "#" },
    ],
    social: [{ name: "GitHub", icon: GitHubIcon }],
};

export default function Blog() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        request
            .get("/main")
            .then((response) => {
                const newPosts = response.data.map((post) => ({
                    id: post.postId,
                    title: post.title,
                    content: post.content,
                }));
                setPosts(newPosts.slice(0, 2));
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);
    console.log(posts);
    return (
        <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={5} sx={{ mt: 3 }}>
                <Grid item xs={8} md={8}>
                    {posts &&
                        posts.map((post) => {
                            return post.id && <Main key={post.id} post={post} />;
                        })}
                </Grid>
                <Sidebar
                    title={sidebar.title}
                    description={sidebar.description}
                    archives={sidebar.archives}
                    social={sidebar.social}
                />
            </Grid>
        </main>
    );
}
