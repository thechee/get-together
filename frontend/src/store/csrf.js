import Cookies from "js-cookie";

export const csrfFetch = async (url, options = {}) => {
  options.headers = options.headers || {}
  options.method = options.method || "GET"

  if (options.method.toUpperCase() !== "GET") {
    if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    options.headers['XSRF-Token'] = Cookies.get("XSRF-TOKEN");
  }

  const res = await window.fetch(url, options);

  // easier to handle failures without throwing exceptions to async await

  // if res status code is 400 or more, throw an error with the 
  // error being the res
  if (res.status >= 400) throw res;
  return res;

}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}