import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ILeadSave, ILeadUpdate } from '../models/saveData.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  url: string = 'http://18.209.209.196:4059';
  dataResponse: any

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.url + '/api/leads/?location_string=India')
    .pipe(catchError(this.handleError));
  }

  saveData(data): Observable<ILeadSave>{
    console.log(data);
    return this.http.post<ILeadSave>(this.url + '/api/leads/', data , {
      headers: new HttpHeaders({
        'ContentType': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  updateData(data, id): Observable<ILeadUpdate>{
    console.log("adsjak");
    return this.http.put<ILeadUpdate>(this.url + '/api/mark_lead/' + id, data , {
      headers: new HttpHeaders({
        'ContentType': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  deleteLead(id): Observable<void>{
    return this.http.delete<void>(this.url + '/api/leads/' + id )
    .pipe(catchError(this.handleError));
  }

  private handleError(error){
    return throwError(error.message);
  }
}
