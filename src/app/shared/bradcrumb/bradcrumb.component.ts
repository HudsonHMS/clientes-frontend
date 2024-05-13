import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'bradcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bradcrumb.component.html',
  styleUrls: ['./bradcrumb.component.scss']
})
export class BradcrumbComponent implements OnInit {

  constructor( private router: Router ){}
  private bradcrumb: string = "home";
  private activateRoute!: ActivatedRouteSnapshot

  ngOnInit(): void {
    this.router.events.subscribe({
      next: ( evt ) => {
        if( evt instanceof ActivationEnd && evt.snapshot.component ) {
          this.activateRoute = evt.snapshot;
        }
        if( evt instanceof NavigationEnd ) {
          this.bradcrumb = "home" + evt.url;
        }

      },
      error: ( err ) => this.bradcrumb = "Home",
    });

  }

  public get getBreadcrumb(): string {
    return this.bradcrumb
  }

  public get getBuildBreadcrumb(): string[] {
    return this.bradcrumb.split('/').filter( rota => !Number.isInteger( parseInt(rota) ) );
  }

}
