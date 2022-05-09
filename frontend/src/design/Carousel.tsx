import { PropsWithChildren } from 'react';
import Slider, { Settings as SliderSettings } from 'react-slick';

const sliderSettings: SliderSettings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 2.5,
    speed: 500,
};

interface CarouselProps {}

const Carousel = ({ children }: PropsWithChildren<CarouselProps>) => {
    return <Slider {...sliderSettings}>{children}</Slider>;
};

export default Carousel;
