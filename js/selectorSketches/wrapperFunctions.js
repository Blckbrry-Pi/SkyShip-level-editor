export function passCallbacks(mainFunction, ...callbacks) {
    return (sketch) => {mainFunction(sketch, ...callbacks)};
}