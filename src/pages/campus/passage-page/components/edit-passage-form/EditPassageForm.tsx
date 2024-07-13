import React, { useEffect, useState } from 'react';
import { useEditFormState } from "../../../../../hooks/useEditFormState";
import PassageForm from "../passage-form/PassageForm";
import Form from "../../../../../components/base/form/Form";
import { PassageOutDTO } from '../../../../../dtos/out/passageOutDto';
import { useDataGet, useDataPatch } from '../../../../../hooks/useApiRequest';
import { mapPassageDataToPassageOut } from '../../../../../mappers/passageMapper';
import { toast } from 'react-toastify';
import { Building } from '../../../../../interfaces/building';
import Floor from '../../../../../interfaces/floor';

interface EditPassageFormProps {
  formData: { [value: string]: string };
  handleCloseModal: () => void;
  refreshData: () => void;
}

const EditPassageForm: React.FC<EditPassageFormProps> = ({ formData, handleCloseModal, refreshData }) => {
  // Handle changes on the text fields
  const { formContent, handleChangeTextField, handleChangeSelect } = useEditFormState(formData);

  // Use the usePatch hook to handle the edit request
  const { data, loading, sendData } = useDataPatch<PassageOutDTO>();

  // State responsible for holding the startPointBuilding domainId
  const [startPointBuildingId, setStartPointBuildingId] = useState<string>();

  // State responsible for holding the endPointBuilding domainId
  const [endPointBuildingId, setEndPointBuildingId] = useState<string>();

  // State responsible for holding the startPointFloor domainId
  const [startPointFloorId, setStartPointFloorId] = useState<string>();

  // State responsible for holding the endPointFloor domainId
  const [endPointFloorId, setEndPointFloorId] = useState<string>();

  // Get the buildings from the API
  const {
    data: buildings, error: buildingError, loading: buildingLoading,
    refreshData: getBuildings
  }
    = useDataGet<Building[]>('/campus/buildings');

  // Initialize the table data, only executed once
  useEffect(() => {
    getBuildings();
  }, []);

  // Prepare the buildings data, {value: buildingCode, id: domainId}
  const buildingsWithCode = buildings && buildings
    .filter((building): building is Building & { buildingCode: string; domainId: string } =>
      building.buildingCode !== undefined && building.domainId !== undefined)
    .map((building) =>
      ({ value: building.buildingCode, id: building.domainId }));



  // Every time the startPointBuilding changes, update the startPointBuildingId
  useEffect(() => {
    if (formData) {
      const buildingElement = document.getElementById(formContent.startPointBuilding);
      if (buildingElement) {
        const domainId = buildingElement.accessKey;
        setStartPointBuildingId(domainId);
      }
    }

  }, [formContent.startPointBuilding]);

  // Every time the endPointBuilding changes, update the endPointBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.endPointBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setEndPointBuildingId(domainId);
    }
  }, [formContent.endPointBuilding]);

  // Get the startPointFloors from the API
  const {
    data: startPointFloors, error: startPointFloorError, loading:
    startPointFloorLoading, refreshData: refreshStartPointFloorData
  }
    = useDataGet<Floor[]>(`/campus/floors/${startPointBuildingId}`);

  useEffect(() => {
    if (startPointBuildingId) {
      refreshStartPointFloorData();
    }
  }, []);

  // Prepare the floors data, {value: floorNumber, id: domainId}
  const startPointFloorsWithNumber = startPointFloors && startPointFloors
    .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
      floor.floorNumber !== undefined && floor.domainId !== undefined)
    .map((floor) =>
      ({ value: floor.floorNumber, id: floor.domainId }));

  // Get the endPointFloors from the API
  const {
    data: endPointFloors, error: endPointFloorError, loading:
    endPointFloorLoading, refreshData: refreshEndPointFloorData
  }
    = useDataGet<Floor[]>(`/campus/floors/${endPointBuildingId}`);

  useEffect(() => {
    if (endPointBuildingId) {
      refreshEndPointFloorData();
    }
  }, []);

  // Prepare the floors data, {value: floorNumber, id: domainId}
  const endPointFloorsWithNumber = endPointFloors && endPointFloors
    .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
      floor.floorNumber !== undefined && floor.domainId !== undefined)
    .map((floor) =>
      ({ value: floor.floorNumber, id: floor.domainId }));


  // Every time the startPointFloor changes, update the startPointFloorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.startPointFloor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setStartPointFloorId(domainId);
    }
  }, [formContent.startPointFloor]);

  // Every time the endPointFloor changes, update the endPointFloorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.endPointFloor);
    if (floorElement) {
      refreshStartPointFloorData();
      const domainId = floorElement.accessKey;
      setEndPointFloorId(domainId);
    }
  }, [formContent.endPointFloor]);

  // Every time the startPointBuildingId changes, refresh the startPointFloor data
  useEffect(() => {
    if (startPointBuildingId) {
      refreshStartPointFloorData();
    }
  }, [startPointBuildingId]);

  // Every time the endPointBuildingId changes, refresh the endPointFloor data
  useEffect(() => {
    if (endPointBuildingId) {
      refreshEndPointFloorData();
    }
  }, [endPointBuildingId]);

    // If a building is selected in the startPointBuilding, remove it from the list to show for the endPointBuilding
    const filteredEndPointBuildings = buildingsWithCode && buildingsWithCode
    .filter((building) => building.value !== formContent.startPointBuilding);

  // If a building is selected in the endPointBuilding, remove it from the list to show for the startPointBuilding
  const filteredStartPointBuildings = buildingsWithCode && buildingsWithCode
    .filter((building) => building.value !== formContent.endPointBuilding);

  useEffect(() => {
    // Use formContent.startPointBuilding to get the startPointBuilding domainId and set it to startPointBuildingId
    buildingsWithCode && buildingsWithCode.forEach((building) => {
      if (building.value === formContent.startPointBuilding) {
        setStartPointBuildingId(building.id);

        // Use formContent.startPointFloor to get the startPointFloor domainId and set it to startPointFloorId
        startPointFloorsWithNumber && startPointFloorsWithNumber.forEach((floor) => {
          if (floor.value === formContent.startPointFloor) {
            setStartPointFloorId(floor.id);
          }
        });
      }
      if (building.value === formContent.endPointBuilding) {
        setEndPointBuildingId(building.id);

        // Use formContent.endPointFloor to get the endPointFloor domainId and set it to endPointFloorId
        endPointFloorsWithNumber && endPointFloorsWithNumber.forEach((floor) => {
          if (floor.value === formContent.endPointFloor) {
            setEndPointFloorId(floor.id);
          }
        });
      }
    });
  }, [buildingsWithCode]);


  // When the data changes, check if it is present and show a toast
  useEffect(() => {
    if (data) {
      toast.success('Passage created successfully');
      refreshData();
    }
  }, [data]);
  
  const handleEdit = async () => {


    // Map formContent to Passage
    const passageToEdit = mapPassageDataToPassageOut(
      startPointFloorId || "",
      parseInt(formContent.sPFirstCoordinateX),
      parseInt(formContent.sPFirstCoordinateY),
      parseInt(formContent.sPLastCoordinateX),
      parseInt(formContent.sPLastCoordinateY),
      endPointFloorId || "",
      parseInt(formContent.ePFirstCoordinateX),
      parseInt(formContent.ePFirstCoordinateY),
      parseInt(formContent.ePLastCoordinateX),
      parseInt(formContent.ePLastCoordinateY),
    )

    try {
      await sendData(`/campus/passages/` + formData.domainId, passageToEdit);

      // Refresh data after submit
      refreshData();
      // Close Modal after submit
      handleCloseModal();
      // Show success toast
      toast.success(`Passage was edited successfully!`);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const editPassageForm =
    <PassageForm
      startPointBuildingData={ filteredStartPointBuildings|| []}
      startPointFloorData={startPointFloorsWithNumber || []}
      startPointBuildingValue={formContent.startPointBuilding}
      startPointFloorValue={formContent.startPointFloor}
      sPFirstCoordinateXValue={formContent.sPFirstCoordinateX}
      sPFirstCoordinateYValue={formContent.sPFirstCoordinateY}
      sPLastCoordinateXValue={formContent.sPLastCoordinateX}
      sPLastCoordinateYValue={formContent.sPLastCoordinateY}
      endPointBuildingData = {filteredEndPointBuildings || []}
      endPointFloorData = {endPointFloorsWithNumber || []}
      endPointBuildingValue={formContent.endPointBuilding}
      endPointFloorValue={formContent.endPointFloor}
      ePFirstCoordinateXValue={formContent.ePFirstCoordinateX}
      ePFirstCoordinateYValue={formContent.ePFirstCoordinateY}
      ePLastCoordinateXValue={formContent.ePLastCoordinateX}
      ePLastCoordinateYValue={formContent.ePLastCoordinateY}
      handleChangeTextField={handleChangeTextField}
      handleChangeSelect={handleChangeSelect}
    />

  return (
    <Form form={editPassageForm} onSubmit={handleEdit} waitingForResponse={loading} />
  )
}

export default EditPassageForm;