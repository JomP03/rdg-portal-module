import { Building } from "../interfaces/building";
import { BuildingDto } from "../dtos/buildingDto";


const mapBuildingToBuildingDto = (building: Building): BuildingDto => {
    const { buildingDimensions, ...rest } = building;
    return {
        ...rest,
        length: buildingDimensions.length,
        width: buildingDimensions.width,
    };
};

const mapBuildingDtoToBuilding = (buildingDto: BuildingDto): Building => {
    const { length, width, ...rest } = buildingDto;
    return {
        ...rest,
        buildingDimensions: { width: buildingDto.width, length: buildingDto.length },
    };
};

export { mapBuildingToBuildingDto, mapBuildingDtoToBuilding };
