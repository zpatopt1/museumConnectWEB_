import { Component, OnInit} from '@angular/core';
import { EventService } from '../../event.service';
import { User } from '../../auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentUser: User = { email: '', password: '', username: '' };
  isLogedIn: boolean = false;
  
  constructor(private eventService: EventService) {

    localStorage.setItem("userEmail", this.currentUser.email);
    localStorage.setItem("username", this.currentUser.username == null ? '' : this.currentUser.username);
  }

  ngOnInit(): void {
    this.eventService.myEvent.subscribe((data) => {
      if (data) {
        this.isLogedIn = true;
        this.currentUser.email = '' + localStorage.getItem("userEmail");
      }
      else {
        this.isLogedIn = false;
        localStorage.setItem("userEmail", '');
        this.currentUser.email = '';
      }
    });
  }

}
