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

class HexagonRow extends React.Component{

    //Generates the Hex Type from a random number generation.
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

    render(){
        const {columns} = this.props
        var items = [];
        for(var i = 0; i < columns; i++){
        var color = this.getHexColor();
        items.push(<Hexagon color={color}/>);
        }

        return(
        <div>
            {items}
        </div>
        );
    }
}

export default HexagonRow