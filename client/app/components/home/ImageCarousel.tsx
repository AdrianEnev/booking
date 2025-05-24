import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ImageCarousel = () => {
    return (
        <div className="w-1/2 h-full rounded-xl">  
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                pagination={{ clickable: false }}
            >
                    <SwiperSlide>
                        <img 
                            src="../../../assets/short_hair_square.jpg" 
                            alt="Slide 1" 
                            className='w-auto h-auto rounded-xl'
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img 
                            src="../../../assets/design_studio_square.jpg" 
                            alt="Slide 2" 
                            className='w-auto h-auto rounded-xl'
                        />
                    </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default ImageCarousel;
