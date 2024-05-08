import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavSupariorComponent } from '../nav-suparior/nav-suparior.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContentComponent } from '../content/content.component';
import { FooterComponent } from '../footer/footer.component';
import * as $ from 'jquery';


@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, NavSupariorComponent, SidebarComponent, ContentComponent, FooterComponent],
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements AfterViewInit {


  ngAfterViewInit(): void {
    (function($) {
      "use strict";

      // Add active state to sidbar nav links
      var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
          $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function( el:any ) {
              if (el.href === path) {
                  $(this).addClass("active");
              }
          });

      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sb-sidenav-toggled");
      });
  })(jQuery);
  }

}
