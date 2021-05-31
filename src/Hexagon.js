import React, {Component} from 'react';

class Hexagon extends React.Component{
  getHexagonPoints(size){
    let points = [];
    //Points are in [x, y] format
    //point A
    points[0] = [size, 0];
    // point B
    points[1] = [size/2, Math.sqrt(3)*size/2];
    //point C
    points[2] = [(-1)*size/2, Math.sqrt(3)*size/2];
    //point D
    points[3] = [(-1)*size, 0];
    //point E
    points[4] = [(-1)*size/2, (-1)*Math.sqrt(3)*size/2];
    //point F
    points[5] = [(1)*size/2, (-1)*Math.sqrt(3)*size/2];
    return points;
  }

  rotate(points, degrees){
    const radians = degrees*(Math.PI/180);
    for(var i = 0; i < points.length; i++){
      const oldPoint = points[i];
      const x = oldPoint[0];
      const y = oldPoint[1];

      //Using matrix transform
      const newX = x*Math.cos(radians) - y*Math.sin(radians);
      const newY = x*Math.sin(radians) + y*Math.cos(radians);

      points[i] = [newX, newY];
    }
  }

  translateX(points, unitsMoved){
    points.forEach(point => point[0] = point[0] + unitsMoved);
  }

  translateY(points, unitsMoved){
    points.forEach(point => point[1] = point[1] + unitsMoved);
  }

    render() {
      const {color} = this.props
      const {size} = this.props
      const {columns} = this.props
      const {columnPosition} = this.props
      const {rowPosition} = this.props
      const {isEvenRow} = this.props

      let points = this.getHexagonPoints(size);
      this.rotate(points, 90);
      this.translateX(points, 3*size*columnPosition/Math.sqrt(3));
      this.translateY(points, size*rowPosition*(3/2));
      if(isEvenRow == "Y"){
        const evenRowTranslation = 3*size/(2*Math.sqrt(3));
        this.translateX(points, evenRowTranslation);
      }
      let stringPoints = "";
      
      points.forEach(point => stringPoints += point[0].toFixed(8) + "," + point[1].toFixed(8) + " ");
      console.log(stringPoints);

      
      // return (
      //   <div className="hex">
      //     <div className="top" style={topStyle}></div>
      //     <div className="middle" style={middleStyle}></div>
      //     <div className="bottom" style={bottomStyle}></div>
      //   </div>
      // );

      return (
          <polygon className="hexagon" points={stringPoints} fill={color}/>
      );
    }
}

export default Hexagon