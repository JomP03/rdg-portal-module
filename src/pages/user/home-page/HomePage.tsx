import Title from "../../../components/base/title/Title"
import Carousel from "../../../components/carousel/Carousel"
import { SECONDARY_COLOR_DARK } from "../../../utils/colors"
import PagePanel from "../../components/page-panel/PagePanel"
import UserImg from '../../../assets/pagePanels/users.png'
import './home-page.css'
import TaskImg from "../../../assets/entity-buttons/task-button.png";
import {USER_PATH, REQUEST_TASK_PATH} from "../../Routes";

const HomePage = () => {
    return (
        <>
            <PagePanel text={'Innovation in Motion'} sentence={'RobDroneGo'} imagePath={UserImg}/>

            <br/>
            <br/>

            <div className={'content'}>
                <Title text={'Our Services'} color={SECONDARY_COLOR_DARK}/>
                <p>We provide a wide range of services to fulfill your necessities.</p>
            </div>

            <br/>
            <br/>

            <Carousel items={[
              {imageUrl: TaskImg, text: 'Task Requisition', path: USER_PATH + REQUEST_TASK_PATH}
            ]}/>
        </>
    )
}

export default HomePage;