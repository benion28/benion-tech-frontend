import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { NewLoginUserComponent } from '../new-login-user/new-login-user.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    public timeService: TimeService,
    private dialog: MatDialog,
    public usersService: UsersService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.timeService.reloadDateTime();
    }, 1000);
  }

  onSidebartoggle() {
    this.toggleSidebarForMe.emit();
  }

  onCreate() {
    this.usersService.initializeUserSignUpFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewLoginUserComponent, dialogConfig);
  }

  onSignOut() {
    this.usersService.signOut();
  }

}
