import React from 'react'
import { Link } from 'react-router-dom';

class GameItem extends React.Component {
    render() {
        const { game } = this.props

        return (
            <Link to={'/'+game.url}>
            <div>

                <li className="list-group-item bg-light" key={game.id}>
                    <h4>{game.title}</h4>

                    <p>
                        Game Added: 8-30-2018
                    </p>

                    <p>
                        <strong>Difficulty:</strong> {game.difficulty}
                    </p>

                    <p>
                        <strong>Description:</strong> {game.description}
                    </p>
                </li>

            </div>
    </Link>
        )
    }
}

export default GameItem
