import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { deletingEdu } from '../../store/actions/ProfileAction';
// import { deletingEdu } from '../store/actions/ProfileAct';


function Edu({ education }) {

    const dispatch = useDispatch();

    const Edus = education.map(exp => (
        <tr key={exp._id} className='text-light'  >
            <td>{exp.school}</td>
            <td className="hide-sm"> {exp.degree} </td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
                {
                    exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button  className='btn btn-danger' onClick={()=>dispatch(deletingEdu(exp._id))} >Delete</button>
            </td>
        </tr>
    ))


    return (
        <>
            <h2 className='my-2 text-light'> Education Credentials </h2>
            <table className="table">
                <thead>
                    <tr className='text-light'>
                        <th>School</th>
                        <th className='hide-sm' > Title </th>
                        <th className='hide-sm' > Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {Edus}
                </tbody>

            </table>
        </>
    )
}

export default Edu
