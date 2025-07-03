import { motion } from 'framer-motion'

function Location({locationRef, locationVisible}: any) {
    return (
        <motion.div className='w-full h-[350px] md:h-[700px]'
            ref={locationRef}
            initial={{ opacity: 0, y: 30 }}
            animate={locationVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            
            <p className="text-4xl text-gray-700 font-medium my-2">Местоположение</p>

            <div className="w-full h-[95%] flex flex-wrap flex-row gap-x-3 gap-y-3 p-3">
                <div className='w-full h-full rounded-xl bg-white shadow-lg border border-gray-100'>
                    <iframe
                        src="https://www.google.com/maps?q=Генерал+Колев+30,+Добрич,+България&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen={true}
                    />
                </div>
            </div>
        </motion.div>
    )
}

/*
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.949217322723!2d-73.98850668459565!3d40.74881707932762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b9f439%3A0x69f7b5b6c3b77b0!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1670000000000!5m2!1sen!2sus"
width="100%"
height="100%"
style={{ border: 0 }}
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
allowFullScreen={true}
></iframe>
*/

export default Location