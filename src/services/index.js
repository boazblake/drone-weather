import Stream from "mithril-stream";

const log = m => v => {
  console.log(m, v);
  return v;
};

const viewModelMap = signature => {
  var _map = {};
  return function(key) {
    if (!_map[key]) {
      _map[key] = {};
      for (var prop in signature) _map[key][prop] = Stream(signature[prop]());
    }
    return _map[key];
  };
};
export { viewModelMap, log };
