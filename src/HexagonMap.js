import React, {Component} from 'react';
import Hexagon from './Hexagon.js';
import HexagonType from './HexagonType.js';

let hexType = {
    PLAIN: "PLAIN",
    HILL: "HILL",
    FOREST: "FOREST",
    DESERT: "DESERT",
    MOUNTAIN: "MOUNTAIN"
};
const hexTypeSize = 5;

class HexagonMap extends React.Component{

    generateHexType(){
        let plains = new HexagonType(hexType.PLAIN, null, "Green", 0.25);
        let hill = new HexagonType(hexType.HILL, null, "Yellow", 0.25);
        let forest = new HexagonType(hexType.FOREST, null, "Red", 0.25);
        let desert = new HexagonType(hexType.DESERT, null, "Brown", 0.25);
        let mountain = new HexagonType(hexType.MOUNTAIN, null, "Gray", 0.25);

        let types = [plains, hill, forest, desert ,mountain];

        let numHexTypes = hexType.size;
        let randomNumber = Math.floor(Math.random()*types.length);
        return types[randomNumber];
    }

    makeRow(hexagonSize, columns, rowPosition){
        var hexagons = [];
        for(var i = 0; i < columns; i++){
            var color = this.generateHexType().color;
            var isEvenRow = (rowPosition + 1) % 2 == 0 ? "Y" : "N";
            hexagons.push(<Hexagon color={color} size={hexagonSize} columns={columns} columnPosition={i} rowPosition={rowPosition} isEvenRow={isEvenRow}/>);
        }

        return hexagons;
    }

    render(){
        const columns = 5;
        const rows = 5;
        const hexagonSize = 2;

        var items = [];

        for(var i = 0; i < rows; i++){
            var isEvenRow = (i + 1) % 2 == 0 ? "Y" : "N";
            let hexagons = this.makeRow(hexagonSize, columns, i);
            items.push(hexagons);
        }

        let percentWidth = 60;//want max of 60% width on our viewbox elements
        percentWidth = percentWidth/columns;
        console.log(percentWidth);
        const stringPercentWidth = "" + percentWidth + "%";
        console.log(stringPercentWidth);

        let viewBoxValue = "" + (-1)*hexagonSize + " " + (-1)*hexagonSize + " " + 10*columns + " " + 2*hexagonSize*rows;

        return (
        <div>
            <svg viewBox={viewBoxValue} style={{width: {stringPercentWidth}}}>
                {items}
            </svg>
        </div>
        )
    }
}

export default HexagonMap