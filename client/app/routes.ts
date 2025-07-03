import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('booking', 'routes/booking/bookingCalendar.tsx'),
    route('login', 'routes/account/accountLogin.tsx'),
    route('account', 'routes/account/account.tsx'),
    route('admin/dashboard', 'routes/admin/dashboard.tsx'),
    route('admin/appointments', 'routes/admin/appointments.tsx'),
    route('contact', 'routes/contact.tsx'),

] satisfies RouteConfig;
