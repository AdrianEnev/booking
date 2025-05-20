export const getDimensions = (element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect();
    return {
        width: Math.round(width),
        height: Math.round(height),
    };
}

export default getDimensions