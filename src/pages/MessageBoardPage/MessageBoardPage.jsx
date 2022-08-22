import { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './MessageBoardPage.css'
import Post from '../../components/Post/Post'
import { getPosts } from '../../utils/axiosRequests'
import { getTopics } from '../../utils/axiosRequests'
import { motion } from 'framer-motion'
import NewPostForm from '../../components/NewPostForm/NewPostForm'


export default function MessageBoardPage() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([])
    const [showPostForm, setShowPostForm] = useState(false)

    useEffect(() => {
        getPosts(setPosts)
        getTopics(setTopics)
    }, [])


    const filterPosts = async (topic) => {
        // await getPosts(setPosts)
        let filteredPosts = posts.filter(post => post.this_topic === topic)
        // console.log(filteredPosts)
        return setPosts(filteredPosts)
    }

    return (
        <motion.main
            id='messageBoardPage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='headerCont'>
                <h1>MESSAGE BOARD</h1>
            </div>
            {user ? <button
                onClick={() => setShowPostForm(!showPostForm)}>New Post</button> : <h1>You must be logged in to make a post</h1>}

            {showPostForm && <NewPostForm />}
            <div>
                <button>All Topics</button>
                {topics.map((topic, idx) => <button 
                onClick={()=> filterPosts(topic.name)}
                key={idx}>
                    {topic.name}
                    </button>)}
            </div>

            {/* sort method on posts to order by newest first */}
            {posts && [...posts].reverse().map((post, i) => <Post post={post} user={user} key={i} />)}
        </motion.main>
    )
}