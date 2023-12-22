import Cookies from "js-cookie";

export const csrfFetch = async (url, options = {}) => {
  options.headers = options.headers || {}
  options.method = options.method || "GET"

  if (options.method.toUpperCase() !== "GET") {
    options.headers['Content-Type'] = options.headers["Content-Type"] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get("XSRF-TOKEN");
  }

  const res = await window.fetch(url, options);

  // if using async await, comment out line 16
  // easier to handle failures without throwing exceptions to async await
  if (res.status >= 400) throw res;
  return res;
  // if (res.ok) {
  //   // const data = res.json()
  //   return res;
  // } else {
  //   // const errors = res.json()
  //   return res;
  // }
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}