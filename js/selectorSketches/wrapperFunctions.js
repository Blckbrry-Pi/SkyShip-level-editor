/**
 * Used to pass "onClick" and "available" functions into sketch-creating function for creating a instance mode sketch. 
 * @param {function} mainFunction
 * @param {...function} callbacks
 * **/
export function passCallbacks(mainFunction, ...callbacks) {
    return (sketch) => {mainFunction(sketch, ...callbacks)};
}