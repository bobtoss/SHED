import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { ITab } from 'src/app/models/tab';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tutor-page',
  templateUrl: './tutor-page.component.html',
  styleUrls: ['./tutor-page.component.css'],
})
export class TutorPageComponent implements OnInit {
  @Output() exit = new EventEmitter();
  role = localStorage.getItem('role');
  eventStatus = false; // initial status of event is true
  tutorEvents: IEvent[] = [];
  activeTab = 1;
  tabs: ITab[] = [
    { name: 'Schedule', num: 1 },
    { name: 'My events', num: 2 },
  ];
  days = [
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    this.userService
      .getTutorEvents(Number(id))
      .subscribe((data) => (this.tutorEvents = data));
  }

  setTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  async changeStatus(event: IEvent) {
    const id = localStorage.getItem('user_id');
    this.userService.updateEventStatus(event);

    this.userService
      .getTutorEvents(Number(id))
      .subscribe((data) => (this.tutorEvents = data));
    console.log(event.status);
  }
}
