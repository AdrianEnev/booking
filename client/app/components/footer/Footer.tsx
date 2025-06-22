import { Instagram, Mail } from 'lucide-react';

export function Footer() {
    return (
        <div className="w-full h-12 flex flex-row items-center justify-between px-4 font-manrope">

            <p className="text-sm text-black md:max-w-full max-w-[70%]">© 2025 Adrian Cuts. All rights Reserved.</p>

            <div className="flex flex-row gap-x-3">
                <Mail color="black" size={24} />
                <Instagram color="black" size={24} />
            </div>
        </div>
    );
}