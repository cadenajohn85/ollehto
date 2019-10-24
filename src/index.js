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
        // Only allow next player to play on a white square
        if (squares[i] !== 'white') {
            return;
        }
        // If player is blue, must play on a square adjoining a yellow square
        if (this.state.blueIsNext) {
            if (squares[i-1] !== 'yellow' && squares[i+1] !== 'yellow' && squares[i-8] !== 'yellow' && squares[i+8] !== 'yellow') {
                return;
            }
        }
        // If player is yellow, must play on a square adjoining a yellow square
        if (!this.state.blueIsNext) {
            if (squares[i-1] !== 'blue' && squares[i+1] !== 'blue' && squares[i-8] !== 'blue' && squares[i+8] !== 'blue') {
                return;
            }
        }

        squares[i] = this.state.blueIsNext ? 'blue' : 'yellow';
        this.setState({
            squares: squares,
            blueIsNext: !this.state.blueIsNext,
        });

        // --------------------- Capture pieces when playing on the right ------------------------------------
        // Note that this invalidates legality of some moves

        let move = i;
        let leftBound;

        // .0 .1 .2 .3 .4 .5 .6 .7
        // .8 .9 10 11 12 13 14 15
        // 16 17 18 19 20 21 22 23
        // 24 25 26 27 28 29 30 31
        // 32 33 34 35 36 37 38 39
        // 40 41 42 43 44 45 46 47
        // 48 49 50 51 52 53 54 55
        // 56 57 58 59 60 61 62 63

        // i % 8 will equal...
        // .0 .1 .2 .3 .4 .5 .6 .7
        // .0 .1 .2 .3 .4 .5 .6 .7

        while (squares[move] !== 'white' && (move % 8) !== 0) {
            console.log("move = " + move);
            if (squares[i] === squares[move]) {
                leftBound = move;
                console.log("leftBound = " + leftBound);
            }
            move--;
            console.log("leftBound now = " + leftBound);
        }

        for (let j = leftBound; j <= i; j++) {
            // console.log(j);
            if (squares[j] !== squares[move]) {
                squares[j] = this.state.blueIsNext ? 'blue' : 'yellow';
            }
        }
        // --------------------- Capture pieces when playing on the right ------------------------------------


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
        // console.log(this.state.squares);
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
