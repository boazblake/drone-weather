export const toMapDto = (acc, { timestamp, metric, latitude, longitude }) => {
  acc.push({
    location: [latitude, longitude],
    metric,
    timestamp,
  });
  return acc;
};

const ToC = f => (f - 32) * 5 / 9;
const ToF = c => c * (9 / 5) + 32;

const changeTemp = () => {
  switch (state.status) {
    case "F":
      state.status = "C";
      state.data.y = state.data.y.map(ToC);
      console.log("F", state);
      break;
    case "C":
      state.status = "F";
      state.data.y = state.data.y.map(ToF);
      console.log("C", state);
      break;
  }
};
