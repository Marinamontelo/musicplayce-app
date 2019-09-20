import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StringMP } from './models/string';

@Injectable({
  providedIn: 'root'
})
export class StringService {
 
  baseUrl:string = environment.api_url + "/string-mp";
  constructor(private http : HttpClient) { }

  
  public save (string: String): Observable<StringMP> {
    return this.http.post<StringMP>(this.baseUrl, string);
  }

  public getAll (): Observable<StringMP[]> {
    return this.http.get<StringMP []>(this.baseUrl);
  }

  public delete(id: number): Observable<StringMP> {
    return this.http.delete<StringMP>(this.baseUrl + '/delete/' + id);
  }
}
