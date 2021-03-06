import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// for the live server with local wordpress running, following var ("domainPrefix") can be set to empty string
// adding domain here allows devs to do local development without installing wp and lemp/lamp server locally
const domainPrefix = "";//"https://kagisoam.co.za";
const wpPrefix = "/cms";

@Injectable({
  providedIn: "root"
})

export class WPAPIService {
  endpoints = domainPrefix + wpPrefix + "/wp-json/wp/v2";
  menuEndPoints = domainPrefix + wpPrefix + "/wp-json/menus/v1";
  pagesEndPoint = domainPrefix + wpPrefix + "/wp-json/acf/v3";
  postEndpoint = domainPrefix + wpPrefix + "/wp-json/wp/v2";
  csvDataEndPoint =
    domainPrefix + wpPrefix + "/?custom_action=get_chart_data&csv_url=";
  emailSendUrl =
    domainPrefix + wpPrefix + "/?custom_action=save_contact";
  subscribeUrl =
    domainPrefix + wpPrefix + "/?custom_action=subscribe";
  unsubscribeUrl =
    domainPrefix + wpPrefix + "/?custom_action=unsubscribe";
  postByslug = domainPrefix + wpPrefix + "/wp-json/wp/v2/posts";
  constructor(private http: HttpClient) {}
  getCategory(query) {
    return this.http.get(`${this.endpoints}/categories/${query}`);
  }
  getSubcategory(query) {
    return this.http.get(`${this.endpoints}/categories/${query}`);
  }
  getPostFromCategory(query) {
    return this.http.get(`${this.postEndpoint}/posts/${query}`);
  }
  getQuaterlyImagePostFromCategory(query) {
    return this.http.get(`${this.postEndpoint}/posts/${query}`);
  }
  getPost(id) {
    return this.http.get(`${this.pagesEndPoint}/posts/${id}`);
  }
  getPostBySlug(slug) {
    return this.http.get(`${this.postByslug}?slug=${slug}`);
  }
  pages(query) {
    return this.http.get(`${this.endpoints}/pages/${query}`);
  }
  getFirstMenu() {
    return this.http.get(`${this.menuEndPoints}/menus/header-menu-first`);
  }
  getSecondMenu() {
    return this.http.get(`${this.menuEndPoints}/menus/header-menu-second`);
  }
  getPages(id) {
    // const headers = new HttpHeaders().set(
    //   "Content-Type",
    //   "text/plain; charset=utf-8"
    // );
    return this.http.get(`${this.pagesEndPoint}/posts/${id}`);
  }
  getCSVData(url) {
    return this.http.get(url, { responseType: "text" });
  }
  readCSVDataFromServer(csvUrl) {
    const apiUrl = `
  ${this.csvDataEndPoint}${csvUrl}?rand=${new Date().getTime()}`;
    return this.http.get(apiUrl, { responseType: "text" });
  }
  subscribe(contact) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      })
    };

    return this.http.get(
      `${this.subscribeUrl}&rand=${new Date().getTime()}&name=${
        contact.name
      }&email=${contact.email}`
    );
  }
  unsubscribe(contact) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      })
    };

    return this.http.get(
      `${this.unsubscribeUrl}&rand=${new Date().getTime()}&name=${
        contact.name
      }&email=${contact.email}`
    );
  }
  saveContact(contact) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      })
    };

    return this.http.get(
      `${this.emailSendUrl}&rand=${new Date().getTime()}&name=${
        contact.name
      }&email=${contact.email}&mobile=${contact.mobile}&intrest=${
        contact.intrest
      }&comment=${contact.comment}`
    );
  }
}
