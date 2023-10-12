import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import NavbarComponent from 'src/app/shared/navbar/navbar.component';
import SidebarComponent from 'src/app/shared/sidebar/sidebar.component';
import FooterComponent from 'src/app/shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ni-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent {

}
