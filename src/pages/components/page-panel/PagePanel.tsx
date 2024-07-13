import React from "react";
import PagePanelContent from "./page-panel-content/PagePanelContent";
import './page-panel.css'


interface PagePanelProps {
    text: string;
    sentence: string;
    imagePath: string;
}

const PagePanel: React.FC<PagePanelProps> = ({text, sentence, imagePath}) => {
    return (
        <div className="page-panel">
            <PagePanelContent text={text} sentence={sentence} imagePath={imagePath}/>
        </div>
    );
};

export default PagePanel;
