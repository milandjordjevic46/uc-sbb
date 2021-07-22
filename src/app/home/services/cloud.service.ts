import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class CloudService {
  abstract get<T>(path: string): Observable<T>;
  abstract create<T>(path: string, data: any): Observable<T>;
  abstract update<T>(path: string, data: string): Observable<T>;
  abstract delete<T>(path: string): Observable<T>;
}

@Injectable()
export class CloudServiceImpl implements CloudService {
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + path);
  }

  create<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(environment.apiUrl + path, data);
  }

  update<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(environment.apiUrl + path, data);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + path);
  }
}
