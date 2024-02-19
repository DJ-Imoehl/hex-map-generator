import React, {Component} from 'react';
import Hexagon from './objects/Hexagon.js';

class HexagonComponent extends React.Component{

    render() {
      const {color} = this.props
      const {size} = this.props
      const {columns} = this.props
      const {columnPosition} = this.props
      const {rowPosition} = this.props
      const {isEvenRow} = this.props

      let hexagon = new Hexagon(size, color, 3*size*columnPosition/Math.sqrt(3), size*rowPosition*(3/2));

      if(isEvenRow == "Y"){
        const evenRowTranslation = 3*size/(2*Math.sqrt(3));
        hexagon.translateX(hexagon.points, evenRowTranslation);
      }
      let stringPoints = "";
      
      hexagon.points.forEach(point => stringPoints += point[0].toFixed(8) + "," + point[1].toFixed(8) + " ");
      console.log(stringPoints);

      return (
          <polygon className="hexagon" points={stringPoints} fill={color}/>
      );
    }
}

export default HexagonComponent