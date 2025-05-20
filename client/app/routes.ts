import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('booking', 'routes/booking/bookingCalendar.tsx'),
    route('booking/services/:date/:hour', 'routes/booking/bookingServices.tsx'),
    route('booking/services/:date/:hour/:service', 'routes/booking/bookAppointment.tsx'),
    route('login', 'routes/account/accountLogin.tsx'),
    route('register', 'routes/account/accountRegister.tsx'),

] satisfies RouteConfig;
