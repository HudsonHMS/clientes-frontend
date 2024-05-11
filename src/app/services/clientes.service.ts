import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable, take } from 'rxjs';
import { ResponseObject } from '../model/response-object';
import { Cliente } from '../model/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly url_api: string = environment.URL_BASE_API;
  constructor( private http: HttpClient ) { }

  public listarClientesAtivos(): Observable<ResponseObject<Cliente[]>> {

    return this.http.get<ResponseObject<Cliente[]>>(`${this.url_api}clientes`).pipe(
      take(1)
    )
  }

  public deletarCliente( id: number ): Observable<ResponseObject<null>> {
    return this.http.delete<ResponseObject<null>>(`${this.url_api}clientes/delete/${id}`).pipe(
      take(1)
    );
  }

  getClientPorId(id: number): Observable<ResponseObject<Cliente>> {
    return this.http.get<ResponseObject<Cliente>>(`${this.url_api}clientes/${id}`).pipe(
      take(1)
    )
  }

  editarCliente( cliente: Cliente ): Observable<ResponseObject<Cliente>> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/json')
    return this.http.put<ResponseObject<Cliente>>(`${this.url_api}clientes`,cliente, {
       headers: headers
    })
    .pipe(
      take(1)
    );
  }

  cadastrarCliente( cliente: Cliente ): Observable<ResponseObject<Cliente>> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-type', 'application/json')
    return this.http.post<ResponseObject<Cliente>>(`${this.url_api}clientes/add`,cliente, {
       headers: headers
    })
    .pipe(
      take(1)
    );
  }

}
