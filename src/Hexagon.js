import React, {Component} from 'react';

class Hexagon extends React.Component{
    render() {
      const {color} = this.props
      const topStyle = {
        borderBottomColor: color
      }
      const middleStyle = {
        backgroundColor: color
      }
      const bottomStyle = {
        borderTopColor: color
      }
      return (
        <div className="hex">
          <div className="top" style={topStyle}></div>
          <div className="middle" style={middleStyle}></div>
          <div className="bottom" style={bottomStyle}></div>
        </div>
      );
    }
}

export default Hexagon