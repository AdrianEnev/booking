export const standardizeService = (service: string) => {
    switch (service) {
        case 'short_hair':
            return 'Къса прическа';
        case 'long_hair':
            return 'Дълга прическа';
        default:
            return service;
    }
}