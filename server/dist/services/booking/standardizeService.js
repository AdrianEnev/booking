"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeService = void 0;
const standardizeService = (service) => {
    switch (service) {
        case 'short_hair':
            return 'Къса коса';
        case 'long_hair':
            return 'Дълга коса';
        default:
            return service;
    }
};
exports.standardizeService = standardizeService;
