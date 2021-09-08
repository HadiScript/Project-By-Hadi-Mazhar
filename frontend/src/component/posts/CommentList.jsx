import React from 'react'
import { ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletingComment } from '../../store/actions/PostActions';

function CommentList({ comments, postId }) {


    const dispatch = useDispatch();
    const auth = useSelector(s => s.auth)

    return (
        <>

            {
                comments.length === 0 ? <ListGroup.Item className="p-4 bg-dark text-light"> No Comments </ListGroup.Item> : comments.map(i => (
                    <>
                        <ListGroup.Item className="p-4 bg-dark text-light">
                            <Row >
                                <h4>{i.name}</h4>
                                {
                                    !auth.loading && i.user === auth.user._id && (
                                        <Link className="text-danger " style={{ marginLeft: "500px", }} onClick={() => dispatch(deletingComment(postId, i._id))} > delete </Link>
                                    )
                                }
                            </Row>
                            <hr />
                            <span className="ml-5" style={{ fontSize: "18px" }}> {i.text} </span>



                        </ListGroup.Item>

                        <div style={{ width: "700px", border: "1px solid white", margin: "auto" }} ></div>
                    </>
                ))
            }

        </>
    )
}


export default CommentList
