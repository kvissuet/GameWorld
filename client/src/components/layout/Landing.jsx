import React from 'react'
import { Link } from 'react-router-dom';

export default class Landing extends React.Component {
    render() {
        return (
            <div>
                <div className="landing">
                    <div className="dark-overlay landing-inner text-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1 className="display-3 mb-4">Game World
                                    </h1>
                                    <p className="lead"> Create a profile, play some bots, share posts and get help
                                        from other people</p>
                                    <hr/>
                                    <Link to="register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                    <Link to="login" className="btn btn-lg btn-light">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}