import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private eventService: EventService){

  }

  ngOnInit(): void {
    this.eventService.myEvent.emit(false);
  }

}
