const getDimensions = async () => {
    if (typeof window !== 'undefined') {
        return {
        width: window.innerWidth,
        height: window.innerHeight,
        };
    }
    return { width: 0, height: 0 };
}

export default getDimensions;