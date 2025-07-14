export function range(start:number) : number[];
export function range(start:number, end:number):number[];
export function range(start:number, end:number, step:number):number[]
export function range(start:number, end?:number, step = 1):number[] {
  const output:number[] = [];


  let e = end;
  let s = start;
  if (end === undefined) {
    e = start;
    s = 0;
  }


  for (let i = s; i < (e ?? start); i += step) {
    output.push(i);
  }


  return output;
}

export function takeItemFromArrayCircular(arr: Array<any>, position: number) {
  const length = arr.length;
  console.log(arr[(position % length + length) % length]);
  return  arr[(position % length + length) % length];
}