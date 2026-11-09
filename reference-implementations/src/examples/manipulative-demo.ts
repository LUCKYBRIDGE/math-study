import {
  ManipulativeRegistry,
  fractionBarDefinition,
  type FractionBarState
} from "../manipulative-registry";

const registry = new ManipulativeRegistry();
registry.register(fractionBarDefinition);

const fraction = registry.get<FractionBarState>("fraction-bar");
const state = fraction.createInitialState();

const context = {
  state,
  update(mutator: (draft: FractionBarState) => void) {
    mutator(state);
  }
};

fraction.pointerDown?.(context, { x: 0.1, y: 0.5 });
fraction.pointerDown?.(context, { x: 0.3, y: 0.5 });

console.log(fraction.serialize(state));
// denominator: 4, selectedParts: [0, 1]
