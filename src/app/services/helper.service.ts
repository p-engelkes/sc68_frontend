import {Headers} from "@angular/http";
/**
 * Created by pengelkes on 02.12.2016.
 */
let headers = new Headers({'Authorization': 'Bearer' + localStorage.getItem('token')});

export function httpGet(url: string) {
  let apiUrl = "http://localhost:8080/api" + url;
  return this.http.get(apiUrl, {headers: headers});
}
