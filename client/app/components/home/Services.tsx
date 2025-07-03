import { motion } from 'framer-motion'

function Services({servicesRef, servicesVisible}: any) {
    return (
        <motion.div className='w-full'
            ref={servicesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={servicesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <p className="text-4xl text-gray-700 font-medium my-2">Услуги</p>
            
            <div className='w-full h-full flex flex-col gap-y-3 md:gap-y-0 md:flex-row md:justify-between pb-8 pt-4'>
                <div className='md:w-[32%] h-[100%] bg-white border border-[#4a6fa5] shadow-md rounded-lg flex flex-col gap-y-2'>
                    <img 
                        src='/images/beard.jpeg'
                        alt="Slide 2" 
                        className='w-full h-full rounded-md'
                    />
                    <p className='sm:text-lg md:text-xl font-medium text-center text-[#4a6fa5] mb-2'>Оформяне на брада</p>
                </div>
                <div className='md:w-[32%] h-[100%] bg-white border border-[#4a6fa5] shadow-md rounded-lg flex flex-col gap-y-2'>
                    <img 
                        src='/images/short_hair_square.jpg'
                        alt="Slide 2" 
                        className='w-full h-full rounded-md'
                    />
                    <p className='text-lg md:text-xl font-medium text-center text-[#4a6fa5] mb-2'>Къси прически</p>
                </div>
                <div className='md:w-[32%] h-[100%] bg-white border border-[#4a6fa5] shadow-md rounded-lg flex flex-col gap-y-2'>
                    <img 
                        src='/images/design_studio_square.jpg'
                        alt="Slide 2" 
                        className='w-full h-full rounded-md'
                    />
                    <p className='sm:text-lg md:text-xl font-medium text-center text-[#4a6fa5] mb-2'>Дълги прически</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Services