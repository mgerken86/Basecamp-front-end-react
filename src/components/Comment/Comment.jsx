import { useEffect, useState } from 'react'
import { getComment } from '../../utils/axiosRequests'
import moment from 'moment'

export default function Comment({ comment }) {
    const [thisComment, setThisComment] = useState(comment)

    // useEffect(() => {
    //     getComment(setThisComment, comment)
    // }, [])

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