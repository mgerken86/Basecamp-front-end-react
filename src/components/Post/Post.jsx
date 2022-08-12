import './Post.css'

export default function Post({ post }) {
    console.log(post)
    return (
        <div>
            <h1>{post.h1}</h1>
            <h2>{post.user}</h2>
            <p>{post.body}</p>
        </div>
    )
}