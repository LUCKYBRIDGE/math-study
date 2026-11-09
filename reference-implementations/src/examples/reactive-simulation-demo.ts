import { DerivedProperty, Property } from "../reactive-property";

const numerator = new Property<number>(1);
const denominator = new Property<number>(4);

const fractionValue = new DerivedProperty<number>(
  [
    numerator as unknown as Property<unknown>,
    denominator as unknown as Property<unknown>
  ],
  () => numerator.value / denominator.value
);

fractionValue.subscribe(value => {
  console.log("redraw fraction / update accessible text:", value);
}, true);

numerator.value = 3;
denominator.value = 5;

fractionValue.dispose();
