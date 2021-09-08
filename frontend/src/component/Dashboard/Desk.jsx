import './desk.css'
import React from 'react'

function Desk() {
    return (
        <div>
            <div className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-2 sidenav fixed-top one bg-danger" id="sides">
                        <p><a href="#">Link</a></p>
                        <p><a href="#">Link</a></p>
                        <p><a href="#">Link</a></p>
                    </div>
                    <div className="col-sm-8 col-8  text-left bg-dark">
                        <h1>Welcome</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <hr />
                        <h3>Test</h3>
                        <p>Lorem ipsum...</p>
                    </div>
                    <div className="col-sm-2 sidenav fixed-right">
                        <div className="well">
                            <p>ADS</p>
                        </div>
                        <div className="well">
                            <p>ADS</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Desk
