import { useEffect, useState } from 'react'
import { getComment } from '../../utils/axiosRequests'

export default function Comment({ comment }) {
    const [thisComment, setThisComment] = useState()

    useEffect(() => {
        getComment(setThisComment, comment)
    }, [])

    return (
        <div>
            <h2>{thisComment.user}</h2>
            <p>{thisComment.body}</p>
        </div>
    )
}