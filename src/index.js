import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {/* TODO */}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    // Using loops to render repeated elements in React:
    // https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
    renderBoard = () => {
        let board = [];

        // Outer loop to create parent
        for (let i = 0; i < 8; i++) {
            let children = [];
            //Inner loop to create children
            for (let j = 0; j < 8; j++) {
                // children.push(<div>{`Column ${j + 1}`}</div>)
                children.push(this.renderSquare(j));
            }
            //Create the parent and add the children
            board.push(<div>{children}</div>)
        }
        return board;
    };


    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
            )

    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
