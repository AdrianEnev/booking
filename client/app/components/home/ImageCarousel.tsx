import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ImageCarousel = ({dimensions}: any) => {
    return (
        <div className={`w-full md:w-1/2 h-full rounded-xl 
            ${(dimensions.height > (dimensions.width) * 0.8) && dimensions.width > 768 ? "mt-[20%]" : // Helps center the courosel when it starts to get pulled up from certain screen sizes
            (dimensions.height > (dimensions.width) * 0.7) && dimensions.width > 768 ? "mt-[10%]" : ""}`}
        >  
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
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
                    
                    <SwiperSlide>
                        <img 
                            src='../../../assets/short_hair_burst_fade_design_cropped.jpg'
                            alt="Slide 2" 
                            className='w-auto h-auto rounded-xl'
                        />
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <img 
                            src='../../../assets/short_hair_burst_fade_cropped.jpg'
                            alt="Slide 2" 
                            className='w-auto h-auto rounded-xl'
                        />
                    </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default ImageCarousel;
