import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Cups extends React.Component {

    test = () => {
        axios.get('https://cups-ai.herokuapp.com/')
    };

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            Cups
                            <button onClick={this.test}> Test </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect()(Cups);