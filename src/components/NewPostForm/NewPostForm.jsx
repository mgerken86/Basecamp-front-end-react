import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getTopics } from '../../utils/axiosRequests'
import './NewPostForm.css'


export default function NewPostForm({  }) {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({title: '', body: ''})
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()

    // console.log(user)

    useEffect(()=> {
        getTopics(setTopics)
    }, [])
  
    // console.log(gear)
      const changeData = (e) => {
        const newData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newData);
      }
  
      const handleSubmit = () => {
        // console.log(formData)
        axios
            .post("https://a-lodge-basecamp.herokuapp.com/posts/", {
                topic: formData.topic_ids,
                user: user.user_id,
                title: formData.title,
                body: formData.body,
            })
            .then((res) => {
                navigate(0)
            })
            .catch((err) => {});
    };

    return (
        <main id='newPostForm'>
            <div className="listSearch">
                <div>
                    {/* <label>Title</label> */}
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
                    {/* <label>Body</label> */}
                    <textarea  
                        // type="textarea"
                        className='postInput'
                        placeholder='Text'
                        name="body"
                        value={formData.body}
                        onChange={changeData}
                        required
                    />
                </div>
                {/* If there's topics, map through the topics and make radio inputs for each */}
                {topics !== null && 
                <div className='topicsList'>
                    {topics.map((item, index) => {
                        return <div key={index}>
                        <input
                        id={item.name}
                        key={index}
                        type="radio"
                        name="topic_ids"
                        value={item.id}
                        onChange={changeData}
                        required
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                    </div>
                    })}
                    
                    
                </div>}
                
                <button
                    className="searchBtn"
                    onClick={() => {
                        handleSubmit()
                    }}>
                    Create Post
                </button>
            </div>
        </main>
    )
}