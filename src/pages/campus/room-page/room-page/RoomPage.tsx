import React from "react";
import PagePanel from "../../../components/page-panel/PagePanel";
import Title from "../../../../components/base/title/Title";
import CreateRoomForm from "./../components/create-room-form/CreateRoomForm";
import RoomsTable from "./../components/rooms-table/RoomsTable";
import {useDataGet} from "../../../../hooks/useApiRequest";
import {RoomInDto} from "../../../../dtos/in/RoomInDto";
import roomImg from "../../../../assets/pagePanels/room.png";



const RoomPage = () => {


    // Get the data from the API
    const {data: rooms, error, loading, refreshData}
        = useDataGet<RoomInDto[]>('/campus/rooms');

    return (
      <>
          <PagePanel
            text={"Rooms"}
            sentence={"Create and List Rooms"}
            imagePath={roomImg}/>

          <div className={'page-content'}>
              <Title text={"All Rooms"} className={"main-titles"}></Title>
              <RoomsTable rooms={rooms || []} error={error} loading={loading} refreshData={refreshData}/>

              <br/><br/>

              <Title text={"Create a Room"} className={"main-titles"}></Title>
              <CreateRoomForm refreshData={refreshData}/>
          </div>

      </>
    )
}

export default RoomPage;