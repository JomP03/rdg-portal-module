import React from "react";
import RobisepTypeInDTO from "../../../../dtos/in/RobisepTypeInDto";
import {useDataGet} from "../../../../hooks/useApiRequest";
import PagePanel from "../../../components/page-panel/PagePanel";
import Title from "../../../../components/base/title/Title";
import RobisepTypesTable from "./../components/robisep-type-table/RobisepTypesTable";
import CreateRobisepTypeForm from "../components//create-robisep-type-form/CreateRobisepTypeForm";
import robisepTypeImg from "../../../../assets/pagePanels/robisepType.png";
import '../../../page.css';

const RobisepTypePage = () => {
    // Get the data from the API
    const {data: robisepTypes, error, loading, refreshData}
        = useDataGet<RobisepTypeInDTO[]>('/fleet/robisepsType');

    return (
        <>
            <PagePanel
                text={"Robisep Types"}
                sentence={"Create and List RobisepTypes"}
                imagePath={robisepTypeImg}/>

            <div className={'page-content'}>
                <Title text={"All Robisep Types"} className={"main-titles"}></Title>
                <RobisepTypesTable robisepTypes={robisepTypes || []} error={error}
                                loading={loading} refreshData={refreshData}/>

                <br/><br/>

                <Title text={"Create a Robisep Type"} className={"main-titles"}></Title>
                <CreateRobisepTypeForm refreshData={refreshData}/>
            </div>

        </>
    )
}

export default RobisepTypePage;