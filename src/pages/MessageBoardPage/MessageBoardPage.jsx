import { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './MessageBoardPage.css'
import Post from '../../components/Post/Post'
import { getPosts } from '../../utils/axiosRequests'
import { motion } from 'framer-motion'
import NewPostForm from '../../components/NewPostForm/NewPostForm'


export default function MessageBoardPage() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([])
    const [showPostForm, setShowPostForm] = useState(false)

    useEffect(() => {
        getPosts(setPosts)
    }, [])


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
            onClick={() => setShowPostForm(!showPostForm)}>New Post</button> : <h2>You must be logged in to make a post</h2>}
            
            {showPostForm && <NewPostForm />}
            
            {/* sort method on posts to order by newest first */}
            {[...posts].reverse().map((post, i) => <Post post={post} user={user} key={i} />)}
        </motion.main>
    )
}