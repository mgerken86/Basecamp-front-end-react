import { useState } from 'react'
import moment from 'moment'
import './Comment.css'
import EditCommentForm from '../EditCommentForm/EditCommentForm'

export default function Comment({ comment, user }) {
    const [thisComment, setThisComment] = useState(comment)
    const [showEditForm, setShowEditForm] = useState(false)

    return (
        <div >
            {thisComment && <div id='Comment'>
                {!showEditForm ? <>
                    <h2>-{thisComment.this_user}</h2>
                    <h3>{moment(thisComment.created_at).format('MM/DD/YYYY hh:mm a')}</h3>
                    <p>{thisComment.body}</p>
                    <hr />
                </> : <EditCommentForm comment={comment} />}
                {comment.this_user === user.username && <div>
                    <button onClick={() => {
                        setShowEditForm(!showEditForm)
                    }}>
                        {!showEditForm ? "Edit My Comment" : "Hide Edit Form"}
                        </button>
                </div>}
            </div>}
        </div>

    )
}