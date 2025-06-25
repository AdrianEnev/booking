import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ServicesComponentsProps {
    setSelectedService: (service: string) => void;
    dimensions?: {
        width: number;
        height: number;
    };
}

const ServicesComponents = ({
    setSelectedService, dimensions
}: ServicesComponentsProps) => {

    const ServiceElement = ({ title, price, src }: { title: string; price: number; src: string }) => {
        return (
            <button className='flex flex-col hover:opacity-70 transition-colors duration-200 cursor-pointer'
                onClick={() => setSelectedService(title)}
            >
                <img 
                    src={src} 
                    alt="Slide 1" 
                    className='w-auto h-auto rounded-t-xl'
                />
                <div className='w-full h-16 bg-[#f8f8f8] shadow-lg border border-gray-200 rounded-b-xl flex items-center justify-between px-6'>
                    <p className='text-xl md:text-2xl font-medium text-[#3a5e94]'>{title}</p>
                    <p className='text-xl md:text-2xl font-semibold text-[#3a5e94]'>{price}лв</p>
                </div>
            </button>
        )
    }

    return (
        <div className='w-[90%] h-full flex items-center'>
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                slidesPerView={(dimensions?.width ?? 0) > 768 ? 2 : 1} // Adjust number of slides based on width
                slidesPerGroup={(dimensions?.width ?? 0) > 768 ? 2 : 1}
                navigation
                loop={true}
                pagination={{ clickable: false }}
                spaceBetween={32} // Adjust spacing between slides
            >

                <SwiperSlide>
                    <ServiceElement title='Къса прическа' price={10} src='/images/short_hair_square.jpg'/>
                </SwiperSlide>
                
                <SwiperSlide>
                    <ServiceElement title='Дълга прическа' price={15} src='/images/design_studio_square.jpg'/>
                </SwiperSlide> 
                
                <SwiperSlide>
                    <ServiceElement title='Услуга 1' price={5} src='/images/short_hair_burst_fade_cropped.jpg'/>
                </SwiperSlide>
                
                <SwiperSlide>
                    <ServiceElement title='Услуга 2' price={12.50} src='/images/short_hair_burst_fade_design_cropped.jpg'/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default ServicesComponents;
