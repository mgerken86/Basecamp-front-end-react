import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditCommentForm.css'
import { deleteComment, editComment } from '../../utils/axiosRequests';


export default function EditCommentForm({ comment }) {
    const [formData, setFormData] = useState({
        body: comment.body,
        user: comment.user,
        post: comment.post

    })
    const navigate = useNavigate()

    // console.log(post)

    const changeData = (e) => {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(newData);
    }


    return (
        <main id='newPostForm'>
            <div className="listSearch">
                <div>
                    <textarea
                        className='postInput'
                        placeholder='Text'
                        name="body"
                        value={formData.body}
                        onChange={changeData}
                        required
                    />
                </div>

                <button
                    className="searchBtn"
                    onClick={() => editComment(comment.id, formData, navigate)}>
                    Edit Comment
                </button>
                <button
                    onClick={() => deleteComment(comment.id, navigate)}>
                    Delete My Comment
                </button>
            </div>
        </main>
    )
}