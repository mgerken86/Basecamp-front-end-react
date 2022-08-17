import { useEffect, useState } from 'react'
import './MessageBoardPage.css'
import Post from '../../components/Post/Post'
import { getPosts } from '../../utils/axiosRequests'
import { motion } from 'framer-motion'
import NewPostForm from '../../components/NewPostForm/NewPostForm'


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
            <NewPostForm />
            {/* sort method on posts to order by newest first */}
            {[...posts].reverse().map((post, i) => {console.log('reverse', posts)
                return <Post post={post} key={i} />})}
        </motion.main>
    )
}