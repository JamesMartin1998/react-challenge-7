import React, { useState, useEffect } from 'react'
import css from "./css/Content.module.css";
import Loader from "./Loader";
import API_KEY from "../secrets";
import axios from "axios"
import PostItemApi from './PostItemApi'

function ContentApiHooks() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async () => {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100`);
        console.log(response);
        const fetchedPosts = response.data.hits
        console.log(fetchedPosts);
        setIsLoaded(true)
        setPosts(fetchedPosts)
        setSavedPosts(fetchedPosts)
    }

    const handleChange = ((e) => {
        const name = e.target.value.toLowerCase();
        const filteredPosts = savedPosts.filter((post) => {
            return post.user.toLowerCase().includes(name);
        })

        setPosts(filteredPosts)
    })

    return (
        <div>
            
                <div className={css.Content}>

                    <div className={css.TitleBar}>
                        <h1>My Photos</h1>
                        <form>
                            <label htmlFor='searchinput'>Search</label>
                            <input
                                type='search'
                                id='searchinput'
                                placeholder='By Author'
                                onChange={(e) => handleChange(e)}
                            />
                            <h4>posts found {posts.length}</h4>
                        </form>
                    </div>

                    <div className={css.SearchResults}>
                        {
                            isLoaded ?
                                <PostItemApi savedPosts={posts} />
                                : <Loader />
                        }
                    </div>
                </div>
            )
        </div>
    )
}

export default ContentApiHooks