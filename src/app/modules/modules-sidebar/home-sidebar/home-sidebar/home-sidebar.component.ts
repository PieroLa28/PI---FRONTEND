import { Component, OnInit, inject } from '@angular/core';
import { SidebarServiceService } from 'src/app/shared/services/sidebar-service.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {
  status:boolean = true;
  nombre:string = 'Josue'
  _sidebarService = inject(SidebarServiceService)


  ngOnInit(): void {
    this._sidebarService.sidebarEffectButton$.subscribe(status =>{
      this.status = status
    })
  }
}
