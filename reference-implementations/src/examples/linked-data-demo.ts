import { LinkedDataSet } from "../linked-dataset";

const data = new LinkedDataSet([
  { id: "s1", values: { height: 140, weight: 35 } },
  { id: "s2", values: { height: 145, weight: 42 } },
  { id: "s3", values: { height: 151, weight: 45 } }
]);

data.assignRole("x", "height");
data.assignRole("y", "weight");

data.onSelection(ids => {
  console.log("Table/Graph/Map should highlight:", [...ids]);
});

data.setSelection(["s2", "s3"]);
