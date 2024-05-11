import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComumService {

  static detector: ChangeDetectorRef;
  static tipo: any;

  constructor() { }

}
