import '../CSS/form.css'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { addingpost } from '../../store/actions/PostActions';

function PostForm() {

    const [text, setText] = useState('');
    const dispatch = useDispatch();
    console.log("in the post form");


    const onsubmit = e => {
        e.preventDefault();
        // dispatch(addingpost({text}));
        console.log({text});
        // setText('');
        // thats why we dont add boody.parse
        // becouse here we pass an object 
    }

    return (
        <form className="mt-1" onsubmit={e => onsubmit(e)} >
            <h1 className="text-secondary mt-5"> Create <span className=" badge badge-primary">Post</span></h1>
            <small className="form-text text-muted ml-5"> lets know us your problem </small>

            <div className="form-group mt-4" style={{ flexDirection: 'row' }} >
                <input
                    value={text}
                    type="text"
                    onChange={e => setText(e.target.value)}
                    className="form-control text-dark fw-bold"
                    placeholder="Type here..."
                />
                <button type="submit" className="btn btn-link form-group"> post </button>
            </div>

        </form>
    )
}

export default PostForm
