import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getTopics } from '../../utils/axiosRequests'
import './NewCommentForm.css'


export default function NewCommentForm({ postId }) {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({body: ''})
    const navigate = useNavigate()


        const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  
      const handleSubmit = () => {
        console.log(formData, user.user_id, postId)
        axios
            .post("https://a-lodge-basecamp.herokuapp.com/comments/", {
            // .post("http://localhost:8000/comments/", {
                post: postId,
                user: user.user_id,
                body: formData.body,
            })
            .then((res) => {
                navigate(0)
            })
            .catch((err) => {});
    };

    return (
        <main id='newPostForm'>
                <div>
                    <label>Body</label>
                    <textarea  
                        // type="textarea"
                        className='postInput'
                        name="body"
                        value={formData.body}
                        onChange={changeData}
                        required
                    />
                </div>
                
                <button
                    className="searchBtn"
                    onClick={() => {
                        handleSubmit()
                    }}>
                    Create Post
                </button>

        </main>
    )
}