import {
  DependencyGraph,
  midpointAlgorithm,
  type Point2
} from "../dependency-graph";

const graph = new DependencyGraph();

graph.addObject<Point2>({ id: "A", kind: "point", value: { x: 0, y: 0 } });
graph.addObject<Point2>({ id: "B", kind: "point", value: { x: 10, y: 0 } });
graph.addObject<Point2>({ id: "M", kind: "point", value: { x: 0, y: 0 } });

graph.addAlgorithm(midpointAlgorithm("midpoint:A:B", "A", "B", "M"));

console.log("initial", graph.get<Point2>("M").value);

graph.update<Point2>("B", { x: 6, y: 4 });

console.log("after B moved", graph.get<Point2>("M").value);
