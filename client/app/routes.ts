import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('booking', 'routes/booking/bookingCalendar.tsx'),
    route('booking/services/:date/:hour', 'routes/booking/bookingServices.tsx'),
    route('booking/services/:date/:hour/:service', 'routes/booking/bookAppointment.tsx'),
    route('login', 'routes/account/accountLogin.tsx'),
    //route('register', 'routes/account/accountRegister.tsx'),
    route('account', 'routes/account/account.tsx'),
    route('admin/dashboard', 'routes/admin/dashboard.tsx'),
    route('admin/appointments', 'routes/admin/appointments.tsx'),

] satisfies RouteConfig;
