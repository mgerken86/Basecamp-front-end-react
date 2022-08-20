import './Post.css'
import Comment from '../Comment/Comment'
import NewCommentForm from '../NewCommentForm/NewCommentForm'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { getPostComments, deletePost } from '../../utils/axiosRequests'
import { useNavigate } from 'react-router-dom'
import EditPostForm from '../EditPostForm/EditPostForm'



export default function Post({ post }) {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getPostComments(setComments, post.id)
    }, [])
    // console.log('comments', comments)
    return (
        <div id='Post' className='ordersCont'>

            {!showEditForm ? <>
                <h1>"{post.title}"</h1>
                <h2>-{post.this_user}</h2>
                <h3><i>{post.this_topic}</i></h3>
                <h3>{moment(post.created_at).format('MM/DD/YYYY hh:mm a')}</h3>
                <p>{post.body}</p>
                <hr />
            </> : <EditPostForm post={post} />}
            <div className='commentBtnsCont'>
                <div>
                    <button onClick={() => setShowCommentForm(!showCommentForm)}>Add Comment</button>
                    {comments.length > 0 &&
                        <button onClick={() => setShowComments(!showComments)}>{!showComments ? 'Show' : 'Hide'} Comments ({comments.length})</button>}
                </div>
                {post.this_user === user.username && <div>
                    <button onClick={async () => {
                        await deletePost(post.id)
                        navigate(0)
                    }}>Delete My Post</button>
                    <button onClick={() => {
                        setShowEditForm(!showEditForm)
                    }}>Edit My Post</button>
                </div>}
            </div>
            {showCommentForm && <NewCommentForm postId={post.id} />}
            {showComments && [...comments].reverse().map((comment, i) => {
                return <Comment comment={comment} user={user} key={i} />
            })}

        </div>
    )
}