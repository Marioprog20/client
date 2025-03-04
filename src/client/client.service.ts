import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients';
import { Category } from '../category/model/Category';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = 'http://localhost:8080/client'

  getClients(): Observable<Client[]>{

    return this.http.get<Client[]>(this.baseUrl);
  }

  saveClient(client: Client): Observable<any> {
    const {id} = client;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    

    return this.http.put<Client>(url, client);
  }
  deleteClient(idClient: Number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idClient}`)
  }

}
