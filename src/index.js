import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                style={{backgroundColor:this.props.bgColor}}
                onClick={() => this.props.onClick({bgColor: 'blue'}) }
            >
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Populate empty squares of board with 'white'
            // Populate middle four squares according to rules of Othello
            squares: Array(64).fill('white',0,27)
                .fill('blue',27,28)
                .fill('yellow',28,29)
                .fill('white',29,35)
                .fill('yellow',35,36)
                .fill('blue',36,37)
                .fill('white',37),
            blueIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.blueIsNext ? 'blue' : 'yellow';
        this.setState({
            squares: squares,
            blueIsNext: !this.state.blueIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                bgColor={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
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
        console.log(this.state.squares);
        const status = 'Next player: ' + (this.state.blueIsNext ? 'Blue' : 'Yellow');

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
