import { useEffect, useState } from 'react'
import './MessageBoardPage.css'
import Post from '../../components/Post/Post'
import { getPosts } from '../../utils/axiosRequests'
import { motion } from 'framer-motion'


export default function MessageBoardPage() {
    const [posts, setPosts] = useState([])

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
            {posts.map(post => <Post post={post} />)}
        </motion.main>
    )
}