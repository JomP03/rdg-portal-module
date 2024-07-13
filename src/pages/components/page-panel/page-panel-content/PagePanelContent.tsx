import React from 'react';
import Header from '../../../../components/base/header/Header';
import SubTitle from '../../../../components/base/sub-title/SubTitle';
import {BACKGROUND_COLOR} from '../../../../utils/colors';
import './page-panel-content.css'


interface PagePanelProps {
    text: string;
    sentence: string;
    imagePath: string;
}

const PagePanelContent: React.FC<PagePanelProps> = ({text, sentence, imagePath}) => {
    return (
        <div className='panel-content-container'>
            <div className='content-left-div'>
                <Header text={text}/>
                <SubTitle text={sentence} color={BACKGROUND_COLOR}/>
            </div>
            <img className='page-panel-img' src={imagePath} alt='Image not found'/>
        </div>
    );
};

export default PagePanelContent;
