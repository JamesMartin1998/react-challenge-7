import React, {Component} from 'react'
import css from "./css/Content.module.css";
import Loader from "./Loader";
import API_KEY from "../secrets";
import axios from "axios"
import PostItemApi from './PostItemApi'


export class ContentApi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            posts: [],
            savedPosts: []
        }
    }

    async fetchImages(){
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100`);
        console.log(response);
        const fetchedPosts = response.data.hits
        console.log(fetchedPosts);
        this.setState({
            isLoaded: true,
            posts: fetchedPosts,
            savedPosts: fetchedPosts
        })
    }

    componentDidMount() {
        this.fetchImages();
    }

    handleChange = (e) => {
        const name = e.target.value.toLowerCase();
        const filteredPosts = this.state.savedPosts.filter((post)=>{
            return post.user.toLowerCase().includes(name);
        })
        
        this.setState({
            posts: filteredPosts
        })
    }
    
    render() {
        return (
            <div className={css.Content}>
                
                <div className={css.TitleBar}>
                    <h1>My Photos</h1>
                    <form>
                        <label htmlFor='searchinput'>Search</label>
                        <input 
                        type='search' 
                        id='searchinput' 
                        placeholder='By Author'
                        onChange={(e) => this.handleChange(e)}
                        />
                        <h4>posts found {this.state.posts.length}</h4>
                    </form>
                </div>

                <div className={css.SearchResults}>
                    {
                        this.state.isLoaded ?
                        <PostItemApi savedPosts={this.state.posts} />
                        : <Loader />
                    }
                </div>
            </div>
        )
    }
}

export default ContentApi