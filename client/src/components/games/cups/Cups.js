import React from 'react'
import { connect } from 'react-redux'

class Cups extends React.Component {
    render() {
        return (
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            Cups
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect()(Cups);