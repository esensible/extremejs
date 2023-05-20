import { setAll } from 'silkjs';

const BASE_URL = "";

export function postEvent(event, data, options) {
    options = options || {};
    data = data || {};
    data.event = event;

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        requestOptions[prop] = options[prop];
      }
    }
  
    var xhr = new XMLHttpRequest();
    xhr.open(requestOptions.method, BASE_URL + "/event");
  
    // xhr.setRequestHeader("Content-Type", "application/json");
  
    for (var header in requestOptions.headers) {
      if (requestOptions.headers.hasOwnProperty(header)) {
        xhr.setRequestHeader(header, requestOptions.headers[header]);
      }
    }
  
    xhr.send(requestOptions.body);
  
    return xhr;
  }


(async function poll() {
try {
    const response = await fetch('/sync');
    const data = await response.json();
    setAll(data, true);
    setTimeout(poll, 0); // reschedule immediately
} catch (error) {
    console.error('Long-polling request failed', error);
    setTimeout(poll, 5000); // retry after 5 seconds
}
})();
  
