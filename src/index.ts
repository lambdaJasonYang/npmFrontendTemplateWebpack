import {d } from "./gg"


const dd : bleh = undefined;
const sayhello = (mystr: String) => {
    return `${mystr} hello!`;
};

console.log(navigator);
interface bobby {
    mode: string;
}

class bob implements bobby {
    mode: string;
    constructor(x: string){
        this.mode = x;
    }
}

const modDom = (target: HTMLCanvasElement) => {
    
    const source = document.createElement('canvas')
    source.width = 400;
    source.height = 400;
    source.getContext("2d").fillRect(20,20,150,150)
    //`target = source` does not work 
    //`Object.assign(target,source)` does not work
    target.replaceWith(source);
        
}
export {modDom, sayhello, d, dd, bob};
