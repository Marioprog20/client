import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../app/core/model/page/Pageable';
import { Prestamo } from './model/Prestamo';
import  {PrestamoPage} from './model/PrestamoPage';
import { PRESTAMO_DATA } from './model/mock-prestamos'; 
import { HttpClient } from '@angular/common/http';
import { MatDatepicker } from '@angular/material/datepicker';
import { ALL_PRESTAMOS_DATA } from './model/mock-all-prestamos';


@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  filterDate:any;
  constructor( private http: HttpClient) { }

  private baseUrl='http://localhost:8080/prestamo';

  getPrestamos(pageable: Pageable, gameName?: string, clientName?:string, fecha?: Date): Observable<PrestamoPage> {
    let params = '';
    if (gameName != null) {
      params += 'gameName=' + gameName + '&';
    }
    if (clientName != null) {
        params += 'clientName=' + clientName + '&';
    }
    if(fecha != null){
      const formattedDate = fecha.toISOString().split('T')[0]; 
      params += 'fecha=' + formattedDate;
    }
    console.log("Dentro de service getPrestamos")
    console.log(clientName)
    console.log(gameName)
    console.log(fecha)
    if(params === ''){
      console.log("If paramos === '' ")
      console.log(params)
      return this.http.post<PrestamoPage>(this.baseUrl, { pageable: pageable });
    }
    else{
      let url = this.baseUrl + '?' + params;
      console.log("Else, paramos y luego url ")
      console.log(params)
      console.log(url)

      return this.http.post<PrestamoPage>(url, { pageable: pageable });
    }
  }
  getAllPrestamos(): Observable<Prestamo[]>{
    
    return this.http.get<Prestamo[]>(this.baseUrl);
  }
  savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
    const { id } = prestamo;
    let url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    url = url + '?';
    url = url + 'clientName=' + prestamo.clientName + '&';
    url = url + 'gameName=' + prestamo.gameName + '&';
    return this.http.put<Prestamo>(url, prestamo);
  }
  deletePrestamo(idPrestamo: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idPrestamo}`)
  }

}
