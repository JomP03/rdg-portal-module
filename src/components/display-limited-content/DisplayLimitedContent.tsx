import React, {useEffect, useState} from 'react';
import ShowMoreButton from "./show-more-button/ShowMoreButton";


interface DisplayLimitedContentProps {
    content: string;
    initialLimit: number;
    maxLimit: number;
    buttonColor?: string;
}

const DisplayLimitedContent: React.FC<DisplayLimitedContentProps> =
    ({content, initialLimit, maxLimit, buttonColor}) => {
        const [showFullContent, setShowFullContent] = useState(content.length <= initialLimit);

        useEffect(() => {
            // Initialize the state when the component mounts
            setShowFullContent(content.length <= initialLimit);
        }, [content, initialLimit]);

        const handleShowMore = () => {
            setShowFullContent(!showFullContent);
        };

        // Truncate the content to the initial limit
        let truncatedContent =
            showFullContent ?
                `${content.slice(0, maxLimit)}` :
                `${content.slice(0, initialLimit)}(...)`;

        return (
            <div className={"limited-content-display"}>
                {truncatedContent}

                {content.length >= initialLimit &&
                  <ShowMoreButton
                    onClick={handleShowMore}
                    showMore={showFullContent}
                    color={buttonColor}
                  />}
            </div>
        );
    };

export default DisplayLimitedContent;
