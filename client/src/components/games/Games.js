import React from 'react'
import GameItem from "./GameItem";
import Moment from "react-moment";

class Games extends React.Component {
    render() {

        let classicGames = (
            <div>

                <GameItem game={ {title:'Connect4', url: "connect4", description:'coming soon'}}/>
                <GameItem game={ {title:'TicTacToe', url: 'tictactoe', description:'coming soon'}}/>
            </div>
        );

        let aiGames = (

            <GameItem game={ {title:'Cups', url:'cups', description:'coming soon'}}/>
        )

        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">AI Games</h3>
                    <ul className="list-group">
                        {aiGames}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Classic Games</h3>
                    <ul className="list-group">
                        {classicGames}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Games