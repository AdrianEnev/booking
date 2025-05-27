import { useRef, useState } from "react";
import type { Route } from "./+types/home";
import ImageCarousel from "~/components/home/ImageCarousel";
import { useNavigate } from 'react-router'
import Location from "~/components/home/Location";
import { Footer } from "~/components/footer/Footer";
import Services from "~/components/home/Services";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Victor Cuts" }
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_NETLIFY };
}

export default function Home({ loaderData }: Route.ComponentProps) {

    const navigate = useNavigate();
    
    return (
        <div className="w-full h-full px-[10%] pt-16 mb-16 font-manrope">

            <div className="w-full h-full flex flex-row justify-between"> 
                <div className="flex flex-col gap-y-5 w-full h-full justify-center mt-[-3%]">

                    <div className="flex flex-col">
                        <p className="font-medium text-[#2f2f2f] 
                            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            Viktor Cuts
                        </p>
                        <p className="font-medium text-[#2f2f2f] 
                            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                            Barbershop
                        </p>
                    </div>

                    <p className="text-sm lg:text-base xl:text-lg text-gray-700 ml-2">
                        Ул. Генерал Колев 30, Добрич
                    </p>

                    <button className="w-50 h-13 rounded-lg bg-[#4a6fa5] shadow-lg border border-gray-100 hover:opacity-60"
                        onClick={() => {
                            navigate("/booking");
                        }}
                    >
                        <p className="text-lg text-white font-bold">Запиши час</p>
                    </button>
                </div>
                
                {/* Images of haircuts */}
                <ImageCarousel />
            </div>

            <div className="w-full h-1 rounded-full bg-gray-100 mb-4 mt-12"></div>
            <Services />
            <div className="w-full h-1 rounded-full bg-gray-100 mb-4 mt-16"></div>
            <Location />
            <div className="w-full h-1 rounded-full bg-gray-100 mt-12"></div>

            <footer className="">
                <Footer />
            </footer>
        </div>
    )
}
