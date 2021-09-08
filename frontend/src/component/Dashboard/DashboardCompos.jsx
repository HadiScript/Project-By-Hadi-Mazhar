import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DashboardCompo() {
    return (

        <>
            <ListGroup variant="flush">
                <ListGroup.Item > <Link to='edit-profile'>  <i className="fa fa-user-circle text-primary "  ></i> Edit Profile </Link> </ListGroup.Item>
                <ListGroup.Item> <Link to='/addExp'> <i className="fab fa-black-tie text-primary " ></i> Add Experience</Link> </ListGroup.Item>
                <ListGroup.Item><Link to='/addEdu'>    <i className="fa fa-graduation-cap text-primary " ></i>Add Educations </Link></ListGroup.Item>
               
            </ListGroup>
            {/* <Link className='btn btn-light mr-3' to='edit-profile' >
                <i className="fa fa-user-circle text-primary "  ></i> Edit Profile
            </Link>
            <Link className='btn btn-light mr-3' to='/addExp' >
                <i className="fab fa-black-tie text-primary " ></i> Add Experience
            </Link>
            <Link className='btn btn-light' to='/addEdu' >
                <i className="fa fa-graduation-cap text-primary " ></i>Add Educations
            </Link> */}
        </>
    )
}

export default DashboardCompo
