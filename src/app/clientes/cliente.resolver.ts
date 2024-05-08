import { filter, Observable, of } from 'rxjs';
import { ResponseObject } from './../model/response-object';
import { ClientesService } from './../services/clientes.service';

import { RouterStateSnapshot, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { Cliente } from '../model/cliente';
import { inject } from '@angular/core';

export const ClienteResolver: ResolveFn<ResponseObject<Cliente>> = (
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot,
          service:ClientesService = inject(ClientesService)
      ): Observable<ResponseObject<Cliente>> => {

        let id: string | null = route.paramMap.get("id");

        if( id ) {
          return service.getClientPorId( parseInt(id) );
        }

        return of();

}
