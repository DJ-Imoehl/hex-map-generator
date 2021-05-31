import React, {Component} from 'react';
import Hexagon from './Hexagon.js';

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
        let numHexTypes = hexType.size;
        let randomNumber = Math.floor(Math.random()*hexTypeSize);
        return Object.keys(hexType)[randomNumber];
    }

    getHexColor(){
        let thisHexType = this.generateHexType();
        switch(thisHexType){
        case hexType.PLAIN:
            return "Green";
        case hexType.HILL:
            return "Yellow";
        case hexType.FOREST:
            return "Red";
        case hexType.DESERT:
            return "Brown";
        case hexType.MOUNTAIN:
            return "Gray";

        }
    }

    makeRow(hexagonSize, columns, rowPosition){
        var hexagons = [];
        for(var i = 0; i < columns; i++){
            var color = this.getHexColor();
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