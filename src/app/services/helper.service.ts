import {Headers, Http} from "@angular/http";
import {LocalStorage} from "../helper/LocalStorage";
import {environment} from "../../environments/environment";
/**
 * Created by pengelkes on 02.12.2016.
 */
let jsonHeaders = new Headers({'Content-Type': 'application/json'});
export let url = environment.url;
export let apiUrl = url + "/api";

export function httpGet(url: string, http: Http) {
  url = apiUrl + url;
  let bearerHeaders = new Headers({'Authorization': 'Bearer' + LocalStorage.getToken()});
  return http.get(url, {headers: bearerHeaders}).toPromise();
}

export function httpDelete(url: string, http: Http) {
  url = apiUrl + url;
  let bearerHeaders = new Headers({'Authorization': 'Bearer' + LocalStorage.getToken()});
  return http.delete(url, {headers: bearerHeaders}).toPromise();
}

export function httpGetWithParameters(url: string, http: Http, ...parameters: Parameter[]) {
  url = apiUrl + url;
  for (let i = 0; i < parameters.length; i++) {
    let parameter = parameters[i];
    if (i == 0) {
      url += '?' + parameter.key + '=' + parameter.value
    }
    if (i != parameters.length - 1) {
      url += "&";
    }
  }

  let bearerHeaders = new Headers({'Authorization': 'Bearer' + LocalStorage.getToken()});
  return http.get(url, {headers: bearerHeaders}).toPromise();
}

export function httpGetWithParametersAndWithoutAuthorization(url: string, http: Http, ...parameters: Parameter[]) {
  url = apiUrl + url;
  for (let i = 0; i < parameters.length; i++) {
    let parameter = parameters[i];
    if (i == 0) {
      url += '?' + parameter.key + '=' + parameter.value
    }

    if (i != 0) {
      url += "&";
      url += parameter.key + "=" + parameter.value
    }
  }

  return http.get(url).toPromise();
}

export async function httpGetWithoutAuthorization(url: string, http: Http): Promise<any> {
  url = apiUrl + url;
  return http.get(url).toPromise();
}

export function httpPostWithoutAuthorization(url: string, jsonObject: any, http: Http) {
  url = apiUrl + url;
  return http.post(url, JSON.stringify(jsonObject), {headers: jsonHeaders}).toPromise();
}

export function httpPost(url: string, jsonObject: any, http: Http) {
  url = apiUrl + url;
  let bearerHeaders = new Headers({
    'Authorization': 'Bearer' + LocalStorage.getToken(),
    'Content-Type': 'application/json'
  });
  return http.post(url, JSON.stringify(jsonObject), {headers: bearerHeaders}).toPromise();
}

export class Parameter {
  public key: string;
  public value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
