export const debounce = (fn: Function, ms = 500) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

// debounce function (defaults wait to .2 seconds)
// const debounce = (func:Function, wait = 200) => {
//     let timeout: any; // for the setTimeout function and so it can be cleared
//     return function executedFunction(...args) { // the function returned from debounce
//         const later = () => { // this is the delayed function
//             clearTimeout(timeout); // clears the timeout when the function is called
//             func(...args); // calls the function
//         };
//         clearTimeout(timeout); // this clears the timeout each time the function is run again preventing later from running until we stop calling the function
//         timeout = setTimeout(later, wait); // this sets the time out to run after the wait period
//     };
// };