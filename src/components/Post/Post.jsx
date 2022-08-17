import './Post.css'
import Comment from '../Comment/Comment'
import moment from 'moment'

export default function Post({ post }) {
    // console.log(post)
    return (
        <div id='Post' className='ordersCont'>
            <h1>{post.title}</h1>
            <h2>{post.this_user}</h2>
            <h3>{post.this_topic}</h3>
            <h3>{moment(post.created_at).format('MM/DD/YYYY')}</h3>
            <p>{post.body}</p>
            <hr />
            <h2>Comments:</h2>
            {post.comments && post.comments.map((comment, i) => {
            return <Comment comment={comment} key={i}/>})
        }
        </div>
    )
}