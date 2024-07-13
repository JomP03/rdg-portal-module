import React, { useEffect } from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import {useDataGet, useUserGet} from "../../../hooks/useApiRequest";
import userimg from "../../../assets/pagePanels/users.png";
import SignUpRequestTable from "./components/signup-request-table/SignUpRequestTable";
import  RegistrationRequestResponseList  from "../../../dtos/in/RegistrationRequestResponseList";

const SignUpRequestPage = () => {
  // Get the data from the API
  const {data: signUpRequests, error, loading, refreshData}
    = useUserGet<RegistrationRequestResponseList>('/SignUpRequest?state=Requested');

  return (
    <>
      <PagePanel
        text={"Sign Up Requests"}
        sentence={"Manage Sign Up Requests"}
        imagePath={userimg}/>

      <div className={'page-content'}>
        <Title text={"All Requests"} className={"main-titles"}></Title>
        <SignUpRequestTable requests={signUpRequests?.registrationRequests || []} error={error}
                     loading={loading} refreshData={refreshData}/>
      </div>

    </>
  )
}

export default SignUpRequestPage;