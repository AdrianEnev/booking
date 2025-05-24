import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import { motion } from 'framer-motion';
import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { GlobalProvider, useGlobalContext } from "@config/GlobalContext";
import fetchAppointments from "@use/booking/useFetchAppointments";
import { FIREBASE_APP, FIREBASE_AUTH } from "@config/firebaseConfig";
import getIsUserAdmin from "./use/user/getIsUserAdmin";
import Sidebar from "./components/Sidebar/Sidebar";
import { Footer } from "./components/footer/Footer";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

const fetchBookedAppointments = async () => {
    const bookedAppointments = await fetchAppointments();
    if (bookedAppointments) {
        localStorage.setItem("bookedAppointments", JSON.stringify(bookedAppointments));
    }
};

function AppContent() {

    const { loading, setLoading, isAdmin, setIsAdmin } = useGlobalContext();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(async () => {
            //setLoading(true);
            fetchBookedAppointments();
            await getIsAuthenticated();
            //setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        getIsAdmin();
    }, [isAuthenticated]);

    const getIsAdmin = async () => {
        const isAdmin = await getIsUserAdmin();
        if (isAdmin) {
            setIsAdmin(true);
            return
        }
        setIsAdmin(false);
    }

    const getIsAuthenticated = async () => {
        const currentUserId = FIREBASE_AUTH.currentUser?.uid;
        if (currentUserId) {
            setIsAuthenticated(true);
            return
        }
        setIsAuthenticated(false);
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Blur overlay */}
            <motion.div
                    className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                    animate={{
                        backdropFilter: loading ? 'blur(10px)' : 'blur(0px)',
                        backgroundColor: loading
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(255,255,255,0)',
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                        WebkitBackdropFilter: loading ? 'blur(10px)' : 'blur(0px)',
                    }}
            />
        
            {/* Spinner */}
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full z-20 flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        
            {/* Main App Layout */}
            <div className={`relative z-0 w-full h-full flex ${isAdmin && isAuthenticated ? 'flex-row' : 'flex-col'}`}>
                <div className={`${isAdmin && isAuthenticated ? 'w-[14%] h-full' : 'w-full h-20'}`}>
                    {isAdmin && isAuthenticated ? (
                        <Sidebar />
                    ) : (
                        <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
                    )}
                </div>

                <main className={`${isAdmin && isAuthenticated ? 'w-[86%] h-full' : 'w-full h-full overflow-y-auto'}`}>
                    <Outlet />
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
      );
      
}

export default function App() {
    return (
        <GlobalProvider>
            <AppContent />
        </GlobalProvider>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {

    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
        error.status === 404
            ? "The requested page could not be found."
            : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}