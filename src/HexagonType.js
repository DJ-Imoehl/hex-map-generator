
let hexType = {
    PLAIN: "PLAIN",
    HILL: "HILL",
    FOREST: "FOREST",
    DESERT: "DESERT",
    MOUNTAIN: "MOUNTAIN"
};
const hexTypeSize = 5;

class HexagonType{

    constructor(description, image, color, neighborSpawnLikelyhood){
        this.description = description;
        this.image = image;
        this.color = color;
        this.neighborSpawnLikelyhood = neighborSpawnLikelyhood;
    }

}

export default HexagonType