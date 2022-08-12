import { useEffect, useState } from 'react'
import './MessageBoardPage.css'
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
        <div></div>
        <h1>MESSAGE BOARD</h1>
        <div></div>
      </div>
        </motion.main>
    )
}