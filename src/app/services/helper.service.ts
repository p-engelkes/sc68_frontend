import {Http, Headers} from "@angular/http";
/**
 * Created by pengelkes on 02.12.2016.
 */
let jsonHeaders = new Headers({'Content-Type': 'application/json'});
let apiUrl = "http://localhost:8080/api";

export function httpGet(url: string, http: Http) {
  url = apiUrl + url;
  let bearerHeaders = new Headers({'Authorization': 'Bearer' + localStorage.getItem('token')});
  return http.get(url, {headers: bearerHeaders});
}

export function httpPost(url: string, jsonObject: any, http: Http) {
  url = apiUrl + url;
  return http.post(url, JSON.stringify(jsonObject), {headers: jsonHeaders});
}
