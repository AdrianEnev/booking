export const standardizeService = (service: string) => {
    switch (service) {
        case 'short_hair':
            return 'Къса коса';
        case 'long_hair':
            return 'Дълга коса';
        default:
            return service;
    }
}