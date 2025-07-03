import { useEffect } from "react";

export function useIntersectionObserver(ref: React.RefObject<HTMLDivElement | null>, callback: () => void, options: IntersectionObserverInit) {
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target); // Stop observing after triggered
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, callback, options]);
}