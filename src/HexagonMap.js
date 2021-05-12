import React, {Component} from 'react';
import HexagonRow from './HexagonRow.js';

class HexagonMap extends React.Component{
    render(){
        const columns = 5;
        const rows = 5;

        var items = [];

        for(var i = 0; i < rows; i++){
        var hexRowClass = (i + 1) % 2 == 0 ? "hex-row even" : "hex-row";
        items.push(<div className={hexRowClass}>
                    <HexagonRow columns={columns}/>
                    </div>);
        }

        return (
        <div>
            {items}
        </div>
        )
    }
}

export default HexagonMap