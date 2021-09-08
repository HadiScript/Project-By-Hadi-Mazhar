import '../CSS/card.css'

import React from 'react'

function newPOst() {
    return (
        <div className="mb-5">
            <div className="main-section">
                <div className="content">
                    <div className="top-section">
                        <div className="user-img">
                            <img src="http://nicesnippets.com/demo/man.png" />
                        </div>
                        <div className="user-detail">
                            <p>name</p>
                            <span>Shared publicly - Jan 20 , 2018</span>
                        </div>
                    </div>
                    <div className="comment-content">
                        <span> text </span>
                    </div>

                    <div className="comment-box box">

                        <div className="enter-btn">
                            <button className="btn text-primary"><i className="fa fa-thumbs-up"></i> </button>
                        </div>
                        <div className="enter-btn">
                            <button className="btn text-primary"><i className="fa fa-thumbs-down"></i> </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default newPOst
