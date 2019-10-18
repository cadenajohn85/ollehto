import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            bgColor: 'white'
        };
    }

    render() {
        return (
            <button
                className="square"
                style={{backgroundColor:this.state.bgColor}}
                onClick={() => this.setState({bgColor: 'blue'}) }
            >
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
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
                children.push(this.renderSquare(8*i + j));
            }
            //Create the parent and add the children
            board.push(<div>{children}</div>)
        }
        return board;
    };


    render() {
        const status = 'Next player: Blue';
        return (
            <div>
                <div className="status">{status}</div>
                <div>
                    {this.renderBoard()}
                </div>
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
