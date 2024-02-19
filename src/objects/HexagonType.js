
let hexType = {
    PLAIN: "PLAIN",
    HILL: "HILL",
    FOREST: "FOREST",
    DESERT: "DESERT",
    MOUNTAIN: "MOUNTAIN"
};
const hexTypeSize = 5;

class HexagonType{

    constructor(description, image, color, neighborSpawnLikelyhood, altitude, moisture, magic){
        this.description = description;
        this.image = image;
        this.color = color;
        this.neighborSpawnLikelyhood = neighborSpawnLikelyhood;
        //this.render = render;
        this.altitude = altitude;//1 to 4
        this.moisture = moisture;//1 to 6
        this.magic = magic;
    }

}

export default HexagonType