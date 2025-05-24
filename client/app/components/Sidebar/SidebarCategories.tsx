import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SidebarCategoriesProps {
    icon: any;
    title: string;
    route: () => void;
}

const SidebarCategories = ({ icon, title, route }: SidebarCategoriesProps) => {
    return (
        <button className='flex flex-row items-center gap-x-2 px-2 py-1 ml-[-5px] bg-gray-100 bg-opacity-0 hover:opacity-60'
            onClick={() => {
                route()
            }}
        >
            <FontAwesomeIcon icon={icon} className='text-black w-5 h-5'/>
            <p className={`text-lg mt-[2px] text-gray-700`}>{title}</p>
        </button>
    )
}

export default SidebarCategories