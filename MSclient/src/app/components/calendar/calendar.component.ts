import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/Campaign';
import { CalendarEvent } from 'calendar-utils'; // Importoi tarvittavat kalenteriin liittyvät moduulit

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  campaigns: Campaign[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  ngOnInit(): void {}
}
