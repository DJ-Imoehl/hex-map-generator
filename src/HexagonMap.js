import React, {Component} from 'react';
import Hexagon from './Hexagon.js';
import HexagonType from './HexagonType.js';
import MapGenerationUtil from './MapGenerationUtil.js';

let hexType = {
    PLAIN: "PLAIN",
    HILL: "HILL",
    FOREST: "FOREST",
    DESERT: "DESERT",
    MOUNTAIN: "MOUNTAIN"
};
const hexTypeSize = 10;

class HexagonMap extends React.Component{

    makeRow(hexagonSize, hexTypes, columns, rowPosition){
        var hexagons = [];
        for(var i = 0; i < columns; i++){
            var hexType = hexTypes[rowPosition][i];
            var color = hexType.color;
            var isEvenRow = (rowPosition + 1) % 2 == 0 ? "Y" : "N";
            hexagons.push(<Hexagon color={color} size={hexagonSize} columns={columns} columnPosition={i} rowPosition={rowPosition} isEvenRow={isEvenRow}/>);
        }

        return hexagons;
    }

    render(){
        const columns = 10;
        const rows = 10;
        const hexagonSize = 2;

        let plains = new HexagonType(hexType.PLAIN, null, "Green", 0.1, 2, 2.5, 0);
        let hill = new HexagonType(hexType.HILL, null, "Yellow", 0.1, 3, 3, 0);
        let forest = new HexagonType(hexType.FOREST, null, "#034B03", 0.1, 2.5, 3.5, 0);
        let desert = new HexagonType(hexType.DESERT, null, "#C2B280", 0.1, 2, 0.5, 0);
        let mountain = new HexagonType(hexType.MOUNTAIN, null, "Gray", 0.1, 3.5, 2, 0);

        let types = [plains, hill, forest, desert ,mountain];

        var items = [];

        var hexagonTypes = MapGenerationUtil.generateMap(types, columns, rows);

        for(var i = 0; i < rows; i++){
            var isEvenRow = (i + 1) % 2 == 0 ? "Y" : "N";
            let hexagons = this.makeRow(hexagonSize, hexagonTypes, columns, i);
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