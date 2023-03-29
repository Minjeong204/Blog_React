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

const mainFeaturedPost = {
    title: "Hello World",
    description: "I LIKE COOKIES",
    image: "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg",
    imageText: "main image description",
};

const featuredPosts = [
    {
        title: "Featured post",
        date: "Nov 12",
        description: "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: "https://source.unsplash.com/random",
        imageLabel: "Image Text",
    },
    {
        title: "Post title",
        date: "Nov 11",
        description: "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: "https://source.unsplash.com/random",
        imageLabel: "Image Text",
    },
];

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
    social: [
        { name: "GitHub", icon: GitHubIcon },
        { name: "Twitter", icon: TwitterIcon },
        { name: "Facebook", icon: FacebookIcon },
    ],
};

export default function Blog() {
    const [posts, setPost] = useState([]);
    const [title, setTitle] = useState([]);
    useEffect(() => {
        request
            .get("/main")
            .then(function (response) {
                setPost([response.data[0].content, response.data[1].content]);
                setTitle([response.data[0].title, response.data[1].title]);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);
    return (
        <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                ))}
            </Grid>
            <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main title={title} posts={posts} />
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
