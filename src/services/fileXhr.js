function XHR(file, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      onSuccess(xhr.responseText);
    } else if (xhr.status === 404) {
      onError(xhr);
    }
  };
  xhr.open("GET", file, true);
  xhr.send();
}

export default XHR;
