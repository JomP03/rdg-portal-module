import Title from "../../components/base/title/Title";
import Header from "../../components/base/header/Header";
import SignUpForm from "./sign-up-form/SignUpForm";
import {useRedirect} from "../../components/redirect/UseRedirect";
import LoadingAnimation from "../../components/loading-animation/LoadingAnimation";
import {BODY_COLOR} from "../../utils/colors";
import Logo from "../../../src/assets/logo-wave.png";
import './sign-up-page.css';


const SignUpPage = () => {

    const {loading} = useRedirect();

    if (loading) {
        return <LoadingAnimation/>;
    }


    return (
        <div className={'background-gradient'}>
            <div className="square-container">
                <div className="create-account-info">
                    <Header text={'RobDroneGo'}/>
                    <Title text={'Task Coordination for Robots and Drones on the ISEP Campus'} color={BODY_COLOR}/>
                    <br/>
                    <br/>
                    <img width={'30%'} src={Logo} alt={'logo not found'}/>

                </div>
                <div className="create-account-form">
                    <SignUpForm/>
                </div>
            </div>

        </div>
    );
}

export default SignUpPage;