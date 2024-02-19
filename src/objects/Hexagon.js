
class Hexagon {

    constructor(size, color, translateXAmount, translateYAmount) {
        this.points = this.calculateHexagonPoints(size);
        this.rotate(this.points, 90);
        this.translateX(this.points, translateXAmount);
        this.translateY(this.points, translateYAmount);
        this.color = color;
        this.size = size;
    }

    calculateHexagonPoints(size){
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
}

export default Hexagon