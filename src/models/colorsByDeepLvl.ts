import { colorOfDepth } from './colorsByDeepLvl';
export type colorOfDepth = string;

const colorsList1: colorOfDepth[] = ["#6278ca", "rgb(151, 166, 218)", "#808dbc",]; // best colors set :)
const colorsList2: colorOfDepth[] = [ // odpada
    "hsl(204, 35%, 50%)",
    "hsl(204, 30%, 50%)",
    "hsl(204, 25%, 50%)",
    "hsl(204, 20%, 50%)",
    "hsl(204, 15%, 50%)",
    "hsl(204, 10%, 50%)",
    "hsl(204, 5%, 50%)",
];
const colorsList3: colorOfDepth[] = [
    "#000feb",
    "#0026cc",
    "#003dad",
    "#00548f",
    "#006b70",
    "##008252s",
];

const colorsList4: colorOfDepth[] = ["red", "blue", "yellow", "silver", "orange"];

const colorsList5: colorOfDepth[]=[
    "silver"
];

export function loopColorTransitions(sourceArray: colorOfDepth[], firstOnlyOnTop: boolean = true): colorOfDepth[] {
    if (sourceArray.length === 1) return sourceArray;
    const lastIterated: number = firstOnlyOnTop ? 1 : 0;

    let result: colorOfDepth[] = [];
    result = sourceArray.slice();
    sourceArray.pop();
    sourceArray.shift();
    for (let i = sourceArray.length - 1; i >= lastIterated; i--) {
        result.push(sourceArray[i]);
    };
    return result;
}

export default loopColorTransitions(colorsList1, true);


// colors picked with w3s-tool: https://www.w3schools.com/colors/colors_mixer.asp