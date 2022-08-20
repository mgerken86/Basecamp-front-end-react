import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditCommentForm.css'
import { editComment } from '../../utils/axiosRequests';


export default function EditCommentForm({ comment, user }) {
    const [formData, setFormData] = useState({
        title: comment.title,
        body: comment.body,
        user: post.user
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
                    <input
                        className='postInput'
                        placeholder='Title'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={changeData}
                        required
                    />
                </div>
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
                    onClick={() => editPost(post.id, formData, navigate)}>
                    Edit Post
                </button>
            </div>
        </main>
    )
}