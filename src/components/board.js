import React, {Component} from 'react';
import refresh from '../assets/refresh.png';
import plus from '../assets/plus.png';
import minus from '../assets/minus.png';

class Board extends Component {
    canvasColor = 0xc5cae9;
    circleColor = 0x0288d1;

    componentDidMount() {
        this.renderCanvas();
    }

    componentDidUpdate() {
        this.renderCanvas();
    }

    renderCanvas = () => {
        const { canvasWidth, canvasHeight, circleRadius, points, increaseRadius, decreaseRadius, clear } = this.props;

        this.refs.container.innerHTML = "";

        this.app = new window.PIXI.Application({ width: canvasWidth, height: canvasHeight, backgroundColor: this.canvasColor, antialias: true });
        this.refs.container.appendChild(this.app.view);

        this.graphics = new window.PIXI.Graphics();
        this.app.stage.addChild(this.graphics);

        this.drawButton(refresh, 1, clear);
        this.drawButton(plus, 2, increaseRadius);
        this.drawButton(minus, 3, decreaseRadius);
        this.drawCircle(circleRadius);

        points.map((point) => {
            this.drawPoint(point);
        });
    };

    isPointInCircle = (point) => {
        const { canvasWidth, canvasHeight, circleRadius } = this.props;

        return Math.sqrt(Math.pow(point.x - canvasWidth / 2, 2) +
            Math.pow(point.y - canvasHeight / 2, 2)
        ) <= circleRadius - 3;
    };

    drawCircle = (radius) => {
        const { canvasWidth, canvasHeight } = this.props;

        this.graphics.lineStyle(2, this.circleColor, 1);
        this.graphics.beginFill(this.canvasColor, 1);
        this.graphics.drawCircle(canvasWidth / 2, canvasHeight / 2, radius);
        this.graphics.endFill();
    };

    drawButton = (icon, position, handler = () => {}) => {
        const sprite = window.PIXI.Sprite.from(icon);

        sprite.anchor.set(0.5);
        sprite.x = this.app.screen.width - 30;
        sprite.y = 30 + 50 * position;
        sprite.width = 30;
        sprite.height = 30;

        sprite.interactive = true;
        sprite.buttonMode = true;

        sprite.on('pointerdown', handler);

        this.app.stage.addChild(sprite);
    };

    drawPoint = (point) => {
        this.graphics.beginFill(this.circleColor, 1);
        this.graphics.drawCircle(point.x, point.y, 3);
        this.graphics.endFill();

        const style = new window.PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff'
        });

        const inCircle = this.isPointInCircle(point);
        const basicText = new window.PIXI.Text(inCircle ? 'In' : 'Out', style);
        basicText.x = point.x - 3;
        basicText.y = point.y + 10;

        this.app.stage.addChild(basicText);
    };

    render() {
        return (
            <div ref="container"/>
        );
    }
}

export default Board;
