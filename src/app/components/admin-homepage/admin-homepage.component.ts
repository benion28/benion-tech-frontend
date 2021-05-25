import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAdminAuthorized().subscribe(
      data => {
        this.usersService.checkAuthorization(data);
      },
      error => {
        if (error === 404) {
          this.usersService.checkAuthentication('error');
        }
        if (error) {
          this.usersService.checkAuthentication('server');
        }
      }
    );
  }
}
