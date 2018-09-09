import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import TextFieldGroup from "../../common/TextFieldGroup";

class Cups extends React.Component {
    constructor(props){
        super(props);
        this.state={
            player:1,
            bottleLocation:5,
            history1:[],
            history2:[],
            balance1:100,
            balance2:100,
            move:"",
            gameStatus:'',
            tieBreaker:1
        }
    }

    handleChange = (e) => {
        this.setState({move:e.target.value})
    };

    handleClick = () => {
        const payload = {
            player:2,
            bottleLocation: this.state.bottleLocation,
            history1:this.state.history1,
            history2:this.state.history2,
        };

        axios.post('https://cups-ai.herokuapp.com/cups',payload)
            .then( res => cleanUp(res));

        const cleanUp = (res) => {
            console.log(res)
            const comMove = Number(res.data);

            console.log(comMove)
            const playerMove = Number(this.state.move);

            if (playerMove > this.state.balance1) {
                this.setState({gameStatus:"Computer Wins due to invalid move by player."})
            }
            if (comMove > this.state.balance2) {
                this.setState({gameStatus:"Player Wins due to invalid move by computer."})
            }

            let {bottleLocation, history1,history2, tieBreaker, balance1, balance2} = this.state;

            if (playerMove>comMove){
                bottleLocation--
            } else if(comMove> playerMove){
                bottleLocation++
            } else{
                bottleLocation = bottleLocation + tieBreaker;
                tieBreaker = tieBreaker * (-1);
            }

            history1.push(playerMove);
            history2.push(comMove);

            balance1 = balance1 - playerMove;
            balance2 = balance2 - comMove;

            if (bottleLocation===0){
                this.setState({gameStatus:"Player Wins."})
            } else if (bottleLocation===10) {
                this.setState({gameStatus:"Computer Wins."})
            } else if (balance1===0 && balance2 === 0 ){
                this.setState({gameStatus:"Tiegame."})
            }

            this.setState({bottleLocation, history1,history2, tieBreaker, balance1, balance2})
            this.setState({move:""})


        }
    };

    test = () => {
        axios.get('https://cups-ai.herokuapp.com/')
    };

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h1> Cups </h1>
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <h2> Player </h2>
                            <h3> Balance: {this.state.balance1} </h3>
                            <input type={'text'} value = {this.state.move} onChange={this.handleChange}/>
                            <button onClick={this.handleClick}> Submit move </button>
                            <h3> history: {this.state.history1.toString()} </h3>
                        </div>

                        <div className="col-4 col-md-3 m-auto">

                            <h2> Bottle Location : {this.state.bottleLocation} </h2>
                            <h2> Game Status: {this.state.gameStatus}</h2>
                        </div>

                        <div className="col-4 col-md-3 m-auto">
                            <h3> Computer Balance: {this.state.balance2} </h3>
                            <h3> Computer History: {this.state.history2.toString()} </h3>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Cups);