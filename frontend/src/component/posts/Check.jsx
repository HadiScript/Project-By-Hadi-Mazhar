import React from 'react'
import { Link } from 'react-router-dom'

function Check() {



    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                backgroundColor: 'black',
                width: '90%',
                height: '500px'

            }}
        >
            {/* name date */}
            <div
                style={{
                    backgroundColor: "white",
                    width: '100%',
                    height: '100px',
                    display: "flex",
                    flexDirection: 'row',

                    alignItems: 'center'
                }}
            >
                <img className='mr-3' src="https://source.unsplash.com/collection/190727/1600x900" alt="this" style={{ height: '70px', width: '70px', borderRadius: '35px' }} />
                <h2 className="text-secondary" style={{ textTransform: 'capitalize', fontWeight: 'bold' }} > hadi </h2>
                <small className="ml-3 text-primary">posted on - 5 Aug</small>

            </div>

            {/* text */}
            <div
                style={{
                    backgroundColor: "white",
                    width: '100%',
                    height: '100px'
                }}
            >
                <p style={{ marginLeft: "30px", fontSize: '22px', width: "400px", textAlign: 'start', color: "#151516", }}>Find company research, competitor information, contact details & financial data for Transport Demy of Bruxelles. Get the latest business insights from Dun</p>
            </div>

            {/* icons */}
            <div
                style={{
                    backgroundColor: "white",
                    width: '100%',
                    height: '100px',
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <button className="btn btn-link"  >
                    <i className="fa fa-thumbs-up " style={{ fontSize: '26px' }}></i> {" "}
                </button>
                <button className="btn btn-link"  >
                    <i className="fa fa-thumbs-down " style={{ fontSize: '26px' }}></i>
                </button>

                <Link to={`/posTById/$`} >{" "} Discussion {" "}
                    {/* {comments.length > 0 && <span>{comments.length}</span>} */}
                </Link>
            </div>

        </div>
    )
}

export default Check
