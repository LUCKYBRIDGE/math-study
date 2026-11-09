export type Expr =
  | { type: "number"; value: number }
  | { type: "symbol"; name: string }
  | { type: "neg"; value: Expr }
  | { type: "add"; terms: Expr[] }
  | { type: "mul"; factors: Expr[] };

export interface Equation {
  left: Expr;
  right: Expr;
}

export type Side = "left" | "right";

export function negate(expr: Expr): Expr {
  return expr.type === "number"
    ? { type: "number", value: -expr.value }
    : { type: "neg", value: expr };
}

export function asAdd(expr: Expr): { type: "add"; terms: Expr[] } {
  return expr.type === "add" ? expr : { type: "add", terms: [expr] };
}

export function simplify(expr: Expr): Expr {
  if (expr.type === "neg" && expr.value.type === "number") {
    return { type: "number", value: -expr.value.value };
  }
  if (expr.type === "add") {
    const terms = expr.terms.map(simplify);
    const numeric = terms.filter((t): t is Extract<Expr, { type: "number" }> => t.type === "number");
    const other = terms.filter(t => t.type !== "number");
    const sum = numeric.reduce((acc, term) => acc + term.value, 0);
    const result = [...other, ...(sum !== 0 || other.length === 0 ? [{ type: "number", value: sum } as Expr] : [])];
    return result.length === 1 ? result[0]! : { type: "add", terms: result };
  }
  return expr;
}

export function moveAddendAcrossEquals(
  equation: Equation,
  from: Side,
  termIndex: number
): Equation {
  const source = asAdd(equation[from]);
  const term = source.terms[termIndex];
  if (!term) throw new Error("Invalid term index");

  const remaining = source.terms.filter((_, index) => index !== termIndex);
  const targetSide: Side = from === "left" ? "right" : "left";
  const target = asAdd(equation[targetSide]);

  const nextSource = simplify(
    remaining.length === 0 ? { type: "number", value: 0 } : { type: "add", terms: remaining }
  );
  const nextTarget = simplify({ type: "add", terms: [...target.terms, negate(term)] });

  return from === "left"
    ? { left: nextSource, right: nextTarget }
    : { left: nextTarget, right: nextSource };
}

export function commuteAddends(expr: Expr, firstIndex: number, secondIndex: number): Expr {
  if (expr.type !== "add") throw new Error("Commutation requires an addition expression");
  const terms = [...expr.terms];
  if (!terms[firstIndex] || !terms[secondIndex]) throw new Error("Invalid term index");
  [terms[firstIndex], terms[secondIndex]] = [terms[secondIndex]!, terms[firstIndex]!];
  return { type: "add", terms };
}

export type Rewrite =
  | { type: "move-across-equals"; from: Side; termIndex: number }
  | { type: "commute-left"; firstIndex: number; secondIndex: number }
  | { type: "commute-right"; firstIndex: number; secondIndex: number };

export function applyRewrite(equation: Equation, rewrite: Rewrite): Equation {
  switch (rewrite.type) {
    case "move-across-equals":
      return moveAddendAcrossEquals(equation, rewrite.from, rewrite.termIndex);
    case "commute-left":
      return { ...equation, left: commuteAddends(equation.left, rewrite.firstIndex, rewrite.secondIndex) };
    case "commute-right":
      return { ...equation, right: commuteAddends(equation.right, rewrite.firstIndex, rewrite.secondIndex) };
  }
}
