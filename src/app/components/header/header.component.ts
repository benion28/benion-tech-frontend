import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public timeService: TimeService) { }

  ngOnInit(): void {
  }

  onSidebartoggle() {
    this.toggleSidebarForMe.emit();
  }

  onReload() {
    this.timeService.reloadDateTime();
  }

  onCreate() {
    console.log('Create Button Clicked');
  }

}
