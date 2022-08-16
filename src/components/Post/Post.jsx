import './Post.css'
import Comment from '../Comment/Comment'

export default function Post({ post }) {
    console.log(post)
    return (
        <div id='Post'>
            <h1>{post.h1}</h1>
            <h2>{post.user}</h2>
            <p>{post.body}</p>
            {/* {post.comments && post.comments.map((comment, i) => {
            return <Comment comment={comment} key={i}/>})
        } */}
        </div>
    )
}