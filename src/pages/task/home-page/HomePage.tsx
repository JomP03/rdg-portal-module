import Title from "../../../components/base/title/Title";
import Carousel from "../../../components/carousel/Carousel";
import { SECONDARY_COLOR_DARK } from "../../../utils/colors";
import PagePanel from "../../components/page-panel/PagePanel";
import {TASK_PATH, PATHS_PATH, TASK_SEQUENCE_PATH, TASK_MANAGEMENT_PATH} from "../../Routes";
import './home-page.css'
import TaskImage from '../../../assets/pagePanels/planning.png'
import PathImage from '../../../assets/entity-buttons/path-button.png'
import TasksImage from '../../../assets/entity-buttons/task-button.png'
import TaskSequenceImage from '../../../assets/entity-buttons/task-sequence-button.png'

const HomePage = () => {
  return (
    <>
      <PagePanel text={'Innovation in Motion'} sentence={'RobDroneGo'} imagePath={TaskImage} />

      <br />
      <br />

      <div className={'content'}>
        <Title text={'Our Services'} color={SECONDARY_COLOR_DARK} />
        <p>We provide a wide range of services to help you manage your tasks.</p>
      </div>

      <br />
      <br />

      <Carousel items={[
        {imageUrl: PathImage, text: 'Paths', path: TASK_PATH + PATHS_PATH},
        {imageUrl: TasksImage, text: 'Tasks', path: TASK_PATH + TASK_MANAGEMENT_PATH},
        {imageUrl: TaskSequenceImage, text: 'Task Sequence', path: TASK_PATH + TASK_SEQUENCE_PATH}
      ]}/>
    </>
  )
}

export default HomePage;