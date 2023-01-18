import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string = 'http://localhost/php-api-demo';

  constructor(private http: HttpClient) {}

  getRequest(api: string) {
    // http://localhost/php-api-demo/users/1
    return this.http.get(this.baseUrl + api);
  }

  postRequest(api: string, body: any) {
    return this.http.post(this.baseUrl + api, body);
  }

  putRequest(api: string, body: any) {
    return this.http.put(this.baseUrl + api, body);
  }

  deleteRequest(api: string) {
    return this.http.delete(this.baseUrl + api);
  }
}
