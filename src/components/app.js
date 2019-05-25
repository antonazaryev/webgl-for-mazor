import React, {Component} from 'react';
import logo from '../assets/logo.png';
import '../styles/app.css';
import Board from "./board";

class App extends Component {
    canvasWidth = 800;
    canvasHeight = 600;

    constructor(props) {
        super(props);

        if (!localStorage.circleRadius) {
            localStorage.circleRadius = 50;
        }

        const points = localStorage.points ? JSON.parse(localStorage.points) : [];
        points.push(this.randomPoint());
        localStorage.points = JSON.stringify(points);

        this.state = {
            circleRadius: parseInt(localStorage.circleRadius),
            points: JSON.parse(localStorage.points)
        };
    }

    randomPoint = () => {
        return {
            x: Math.floor(Math.random() * (this.canvasWidth - 55)),
            y: Math.floor(Math.random() * (this.canvasHeight - 10))
        }
    };

    increaseRadius = () => {
        this.setState({ circleRadius: this.state.circleRadius + 1 });
        localStorage.circleRadius = this.state.circleRadius + 1;
    };

    decreaseRadius = () => {
        this.setState({ circleRadius: this.state.circleRadius - 1 });
        localStorage.circleRadius = this.state.circleRadius + 1;
    };

    clearPoints = () => {
        localStorage.points = [];
        this.setState({ points: [] });
    };

    render() {
        const { points, circleRadius } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <Board
                    canvasWidth={this.canvasWidth}
                    canvasHeight={this.canvasHeight}
                    circleRadius={circleRadius}
                    points={points}
                    increaseRadius={this.increaseRadius}
                    decreaseRadius={this.decreaseRadius}
                    clear={this.clearPoints}
                />
            </div>
        );
    }
}

export default App;
