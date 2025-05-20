import { useRef, useState } from "react";
import type { Route } from "./+types/home";
import ImageCarousel from "~/components/home/ImageCarousel";
import { useNavigate } from 'react-router'

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

            <div className="relative w-full h-full flex flex-row justify-between z-20"> 

                <div className="flex flex-col gap-y-5 w-full h-full justify-center z-20">

                    <div className="flex flex-col">
                        <p className="text-6xl text-gray-900 font-medium">
                            Victor Cuts
                        </p>
                        <p className="text-6xl text-gray-900 font-medium">
                            Barbershop
                        </p>
                    </div>

                    <p className="text-lg text-gray-700 ml-2">
                        Ул. "Тест Тест" 1, 1000 Добрич
                    </p>

                    <button className="w-42 h-12 rounded-lg bg-white shadow-md hover:opacity-80"
                        onClick={() => {
                            navigate("/booking");
                        }}
                    >
                        <p className="text-lg text-black font-bold">Запиши час</p>
                    </button>
                </div>
                
                {/* Images of haircuts */}
                <ImageCarousel />
            
            </div>

            <div className="w-full h-1 rounded-full bg-gray-100 mb-4 mt-12"></div>

            <div className="w-full h-full">
                <p className="text-4xl text-gray-700 font-medium my-2">Отзиви</p>

                <div className="w-full h-full flex flex-wrap flex-row gap-x-3 gap-y-3 p-3">
                    <div className="review-box">
                        <p>Гошо Георгиев</p>
                    </div>
                    <div className="review-box">
                        <p>Иван Иванов</p>
                    </div>
                    <div className="review-box">
                        <p>Димитър Димитров</p>
                    </div>
                    <div className="review-box">
                        <p>Петър Петров</p>
                    </div>
                    <div className="review-box">
                        <p>Мишо Мишката</p>
                    </div>
                    <div className="review-box">
                        <p>Петьо Пуйката</p>
                    </div>
                </div>

            </div>

        </div>
    )
}
