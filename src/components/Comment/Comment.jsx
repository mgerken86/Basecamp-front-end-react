import { useEffect, useState } from 'react'
import { getComment } from '../../utils/axiosRequests'

export default function Comment({ comment }) {
    const [thisComment, setThisComment] = useState()

    useEffect(() => {
        getComment(setThisComment, comment)
    }, [])

    return (
        
        <div>
            {thisComment && <>
            <h2>{thisComment.this_user}</h2>
            <p>{thisComment.body}</p>
            <p>{thisComment.created_at}</p>
            <hr />
            </>}
        </div>

    )
}