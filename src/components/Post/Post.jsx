import './Post.css'
import Comment from '../Comment/Comment'
import NewCommentForm from '../NewCommentForm/NewCommentForm'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getPostComments } from '../../utils/axiosRequests'



export default function Post({ post }) {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState(false)

    useEffect(()=> {
        getPostComments(setComments, post.id)
    }, [])
    console.log('comments',comments)
    return (
        <div id='Post' className='ordersCont'>
            <h1>"{post.title}"</h1>
            <h2>-{post.this_user}</h2>
            <h3><i>{post.this_topic}</i></h3>
            <h3>{moment(post.created_at).format('MM/DD/YYYY hh:mm a')}</h3>
            <p>{post.body}</p>
            <hr />
            <div id='commentBtnsCont'>
                <button onClick={()=> setShowCommentForm(!showCommentForm)}>Add Comment</button>
                {comments.length > 0 &&
                    <button onClick={() => setShowComments(!showComments)}>{!showComments ? 'Show' : 'Hide'} Comments ({comments.length})</button>}
            </div>
            {showCommentForm && <NewCommentForm postId={post.id}/>}
            {showComments && [...comments].reverse().map((comment, i) => {
                return <Comment comment={comment} key={i} />
            })}

        </div>
    )
}