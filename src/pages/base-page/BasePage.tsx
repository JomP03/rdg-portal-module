import Title from "../../components/base/title/Title";
import Header from "../../components/base/header/Header";
import AuthButton from "../../components/auth-button/AuthButton";
import {useAuth0} from '@auth0/auth0-react';
import {useRedirect} from "../../components/redirect/UseRedirect";
import LoadingAnimation from "../../components/loading-animation/LoadingAnimation";
import {BODY_COLOR} from "../../utils/colors";
import Logo from "../../../src/assets/logo.png";
import './base-page.css';


const BasePage = () => {

  const {loginWithRedirect} = useAuth0();
  const {loading} = useRedirect();

  if (loading) {
    return <LoadingAnimation/>;
  }

    return (
        <div className={'background-gradient'}>
            <div className={'base-square-container'}>
              <Header text={'RobDroneGo'}/>
              <Title text={'Task Coordination for Robots and Drones on the ISEP Campus'} color={BODY_COLOR}/>

              <br/>
              <br/>

              <div className={'form-row'}>
                <img src={Logo} alt={'Logo'} className={'base-logo'}/>
              </div>

              <br/>
              <br/>

              <div className={'form-row'}>
                <AuthButton onClick={loginWithRedirect} label={'Sign Up'}/>
                <AuthButton onClick={() => loginWithRedirect()} label={'Login'}/>
              </div>
            </div>

        </div>
    );
}

export default BasePage;