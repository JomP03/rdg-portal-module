import React, {useState} from 'react';
import ImageButton from '../base/image-button/ImageButton';
import CarouselSquare from "../carousel-square/CarouselSquare";
import NextArrow from '../../assets/next-arrow.png';
import PreviousArrow from '../../assets/previous-arrow.png';
import './carousel.css';


interface CarouselProps {
    items: {
        imageUrl: string;
        text: string;
        path: string;
    }[];
}

const Carousel: React.FC<CarouselProps> = ({items}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % items.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + items.length) % items.length);
    };

    return (
        <div className={'carousel'}>
            {items.length > 3 && <ImageButton imageUrl={PreviousArrow}
                                              onClick={handlePrevious} width={'50px'} height={'auto'}/>}

            {items.length > 0 && <CarouselSquare text={items[currentIndex].text}
                                                 path={items[currentIndex].path}
                                                 imageUrl={items[currentIndex].imageUrl}
            />}
            {items.length > 1 && <CarouselSquare text={items[(currentIndex + 1) % items.length].text}
                                                 path={items[(currentIndex + 1) % items.length].path}
                                                 imageUrl={items[(currentIndex + 1) % items.length].imageUrl}
            />}
            {items.length > 2 && <CarouselSquare text={items[(currentIndex + 2) % items.length].text}
                                                 path={items[(currentIndex + 2) % items.length].path}
                                                 imageUrl={items[(currentIndex + 2) % items.length].imageUrl}
            />}
            {items.length > 3 && <ImageButton imageUrl={NextArrow}
                                              onClick={handleNext} width={'50px'} height={'auto'}/>}
        </div>
    );
};


export default Carousel;
