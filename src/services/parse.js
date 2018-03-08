import Papa from "papaparse";

import { log } from "../utils/index.js";

export const parsePromise = model => e =>
  new Promise((complete, error) => {
    Papa.parse(e.target.files[0], {
      delimiter: " ",
      complete,
      error,
    });
  });
