import {
  applyRewrite,
  type Equation
} from "../rewrite-engine";

const equation: Equation = {
  left: {
    type: "add",
    terms: [
      { type: "symbol", name: "x" },
      { type: "number", value: 3 }
    ]
  },
  right: { type: "number", value: 10 }
};

const next = applyRewrite(equation, {
  type: "move-across-equals",
  from: "left",
  termIndex: 1
});

console.dir(next, { depth: null });
