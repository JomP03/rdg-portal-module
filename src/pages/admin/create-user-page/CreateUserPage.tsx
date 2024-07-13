import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import usersImg from '../../../assets/pagePanels/building.png';
import '../../page.css';
import CreateBackofficeUserForm from "./components/create-backoffice-user-form/CreateBackofficeUserForm";

const CreateUserPage = () => {

    return (
        <>
            <PagePanel
                text={"Backoffice Users"}
                sentence={"Create Campus Managers, Fleet Managers and Task Managers"}
                imagePath={usersImg}/>
            <br/>
            <div className={'page-content'}>
                <Title text={"Create a Backoffice User"} className={"main-titles"}></Title>
                <CreateBackofficeUserForm/>
            </div>

        </>
    )
}

export default CreateUserPage;