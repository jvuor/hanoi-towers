import { Solution } from "./towers.interface";

interface Rod extends Array<number> {
  name?: number;
}

export default function solve (numberOfDiscs: number): Solution {
  const a: Rod = Array(numberOfDiscs).fill(null).map((a, i) => i + 1);
  const b: Rod = [];
  const c: Rod = [];
  a.name = 0;
  b.name = 1;
  c.name = 2;
  const solution: Solution = [];
  move(numberOfDiscs, a, c, b, solution);

  return solution;
}

function move(n: number, source: Rod, target: Rod, aux: Rod, solution: Solution) {
  if (n > 0) {
    move(n - 1, source, aux, target, solution);
    target.push(source.pop());
    solution.push([source.name, target.name]);
    move(n - 1, aux, target, source, solution);
  }
}
