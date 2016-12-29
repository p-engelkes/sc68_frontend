import {Http, Headers} from "@angular/http";
import {LocalStorage} from "../helper/LocalStorage";
/**
 * Created by pengelkes on 02.12.2016.
 */
let jsonHeaders = new Headers({'Content-Type': 'application/json'});
export let url = "http://localhost:8081";
export let apiUrl = url + "/api";

export function httpGet(url: string, http: Http) {
  url = apiUrl + url;
  let bearerHeaders = new Headers({'Authorization': 'Bearer' + LocalStorage.getToken()});
  return http.get(url, {headers: bearerHeaders});
}

export function httpGetWithoutAuthorization(url: string, http: Http) {
  url = apiUrl + url;
  return http.get(url);
}

export function httpPostWithoutAuthorization(url: string, jsonObject: any, http: Http) {
  url = apiUrl + url;
  let bearerHeaders = new Headers({
    'Authorization': 'Bearer' + LocalStorage.getToken(),
    'Content-Type': 'application/json'
  });
  return http.post(url, JSON.stringify(jsonObject), {headers: bearerHeaders});
}
