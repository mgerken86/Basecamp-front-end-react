

export default function Comment({ comment }) {
    console.log('comment', comment)
    return (
        <div>
            <h2>{comment.user}</h2>
            <p>{comment.body}</p>
        </div>
    )
}