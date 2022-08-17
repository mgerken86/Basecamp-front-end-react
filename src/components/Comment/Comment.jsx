import { useState } from 'react'
import moment from 'moment'

export default function Comment({ comment }) {
    const [thisComment, setThisComment] = useState(comment)


    return (
        <div>
            {thisComment && <>
            <h2>{thisComment.this_user}</h2>
            <h3>{moment(thisComment.created_at).format('MM/DD/YYYY')}</h3>
            <p>{thisComment.body}</p>
            <hr />
            </>}
        </div>

    )
}