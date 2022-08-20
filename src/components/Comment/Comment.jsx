import { useState } from 'react'
import moment from 'moment'
import './Comment.css'
import EditCommentForm from '../EditCommentForm/EditCommentForm'

export default function Comment({ comment }) {
    const [thisComment, setThisComment] = useState(comment)

    console.log(comment)

    return (
        <div >
            {thisComment && <div id='Comment'>
            <h2>-{thisComment.this_user}</h2>
            <h3>{moment(thisComment.created_at).format('MM/DD/YYYY hh:mm a')}</h3>
            <p>{thisComment.body}</p>
            <hr />
            <EditCommentForm comment={comment}/>
            </div>}
        </div>

    )
}