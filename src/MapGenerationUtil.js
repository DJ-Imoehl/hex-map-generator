


class MapGenerationUtil {

    static generateMap(applicableHexagonTypes, columns, rows){
        var hexagonMap = this.initialRandomGeneration(applicableHexagonTypes, columns, rows);
        //Calculate altitudes first. 
        //TODO: take into account rain shadows from mountains
        var altitudeMap = this.mapNumberRandomGeneration(4, columns, rows);
        var moistureMap = this.mapNumberRandomGeneration(6, columns, rows);

        console.log(altitudeMap);
        console.log(moistureMap);

        var smoothedAltitudeMap = this.smoothMapNumberGeneration(altitudeMap);
        var smoothedMoistureMap = this.smoothMapNumberGeneration(moistureMap);

        console.log(smoothedAltitudeMap);
        console.log(smoothedMoistureMap);
        return this.generateHexagonMap(applicableHexagonTypes, smoothedAltitudeMap, smoothedMoistureMap, columns, rows);
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
/*global altitudeRandomGeneration*/
    static mapNumberRandomGeneration(maxNumber, columns, rows){
        var numberMap = [];//bla
        for(var i = 0; i < rows; i++){
            var mapRow = [];
            for(var j = 0; j < columns; j++){
                let randomNumber = Math.floor(Math.random()*maxNumber);
                mapRow.push(randomNumber);
            }
            numberMap.push(mapRow);
        }
        return numberMap;
    }
/*global smoothMapNumberGeneration*/
    static smoothMapNumberGeneration(numberMap){
        var smoothedNumberMap = [];
        for(var i = 0; i < numberMap.length; i++){
            var newRow = [];
            var currentRow = numberMap[i];
            console.log("Row " + i + " is: " + currentRow);
            for(var j = 0; j < currentRow.length; j++){
                
                //TODO: find the best algorithm for neighbors affecting each others' elevation

                //Calling calculateRowAdjacentAverage for adjacent rows gives us the overall average between
                //rows and columns
                let cellValue = currentRow[j];
                if(i == 0 && i < numberMap.length - 1){
                    cellValue = (this.calculateRowAdjacentAverage(currentRow,j)
                        + this.calculateRowAdjacentAverage(currentRow,j + 1))/2;
                } else if(i > 0 && i > numberMap.length - 1){
                    cellValue = (this.calculateRowAdjacentAverage(currentRow,j)
                        + this.calculateRowAdjacentAverage(currentRow,j - 1)
                        + this.calculateRowAdjacentAverage(currentRow,j + 1))/3;
                } else if(i != 0 && i == numberMap.length - 1){
                    cellValue = (this.calculateRowAdjacentAverage(currentRow,j)
                        + this.calculateRowAdjacentAverage(currentRow,j - 1))/2;
                } else {
                    cellValue = this.calculateRowAdjacentAverage(currentRow,j);
                }
                newRow.push(cellValue);
            }
            smoothedNumberMap.push(newRow);
        }
        console.log(smoothedNumberMap);
        return smoothedNumberMap;
    }
/*global calculateRowAdjacentAverage */
    static calculateRowAdjacentAverage(currentRow,j){
        if(j == 0 && j < currentRow.length - 1){
            var neighborValue = currentRow[j+1];
            //Get the average of this cell and its neighbors
            let newCellValue = (currentRow[j] + neighborValue)/2;
            return newCellValue;
        } else if (j > 0 && j < currentRow.length - 1){
            var rightNeighborValue = currentRow[j+1];
            var leftNeighborValue = currentRow[j-1];
            let newCellValue = (currentRow[j] + rightNeighborValue + leftNeighborValue)/3;
            return newCellValue;
        } else if (j != 0 && j == currentRow.length - 1) {//j is last column
            var neighborValue = currentRow[j-1];
            let newCellValue = (currentRow[j] + neighborValue)/2;
            return newCellValue;
        } else {
            //Weird Case: probably 1x1 map
            return currentRow[j];
        }
    }

/*global generateHexagonMap*/
    static generateHexagonMap(applicableHexTypes, altitudeMap=[], moistureMap=[], column, row){
        var hexMap = [];
        for(var i = 0; i < row; i++){//row
            var hexRow = [];
            var altitudeRow = altitudeMap[i];
            var moistureRow = moistureMap[i];
            for(var j = 0; j < column; j++){//column
                var altitude = altitudeRow[j];
                var moisture = moistureRow[j];
                
                var bestHexMatch;
                var bestValue;
                for(var k = 0; k < applicableHexTypes.length; k++){
                    if(k == 0) {
                        bestHexMatch = applicableHexTypes[0];
                        bestValue = this.calculateHexValue(bestHexMatch, altitude, moisture);
                    } else {
                        //Calculate difference (absolute value) between the random altitude and 
                        //the hex type's altitude. Do the same for moisture. Add these two 
                        //differences. The hex type with the lowest value wins.
                        var hexValue = this.calculateHexValue(applicableHexTypes[k], altitude, moisture);
                        if(hexValue < bestValue){
                            bestValue = hexValue;
                            bestHexMatch = applicableHexTypes[k];
                        }
                    }

                }
                hexRow.push(bestHexMatch);
            }
            hexMap.push(hexRow);

        }
        return hexMap;
    }
/*global calculateHexValue*/
    static calculateHexValue(hexType, altitude, moisture){
        var altitudeDiff = Math.abs(altitude - hexType.altitude);
        var moistureDiff = Math.abs(moisture - hexType.moisture);
        return altitudeDiff + moistureDiff;
    }


}

export default MapGenerationUtil