import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { deletingExp } from '../../store/actions/ProfileAction';


function Experience({ experience }) {

    const dispatch = useDispatch(); 

    console.log('this is the experience', experience);

    const Exps = experience  && experience.map(exp => (
        <tr key={exp._id} className='text-light'>
            <td>{exp.company}</td>
            <td className="hide-sm"> {exp.title} </td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
                {
                    exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button className='btn btn-danger' onClick={()=>{dispatch(deletingExp(exp._id))}} >Delete</button>
            </td>
        </tr>
    ))


    return (
        <>
            <h2 className='my-2 text-light'> Experience Credentials </h2>
            <table className="table">
                <thead>
                    <tr className='text-light'>
                        <th>Company</th>
                        <th className='hide-sm' > Title </th>
                        <th className='hide-sm' > Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {Exps}
                </tbody>

            </table>
        </>
    )
}

export default Experience
