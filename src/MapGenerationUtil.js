


class MapGenerationUtil {

    static generateMap(applicableHexagonTypes, columns, rows){
        var hexagonMap = this.initialRandomGeneration(applicableHexagonTypes, columns, rows);


        return hexagonMap;
    }
/*global initialRandomGeneration*/
    static initialRandomGeneration(applicableHexagonTypes, columns, rows){
        var hexagonMap = [];
        for(var i = 0; i < rows; i++){
            var hexagonRow = [];
            for(var j = 0; j < columns; j++){
                let randomNumber = Math.floor(Math.random()*applicableHexagonTypes.length);
                hexagonRow.push(applicableHexagonTypes[randomNumber]);
            }
            hexagonMap.push(hexagonRow);
        }


        return hexagonMap;
    }
}

export default MapGenerationUtil