import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userService = inject(UserService); // kun injektoi niin ei tarvitse contstructoria
  users: any[] = [];
  usersSize: number = 0;
  btnStatus: string = 'Hide';

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    console.log('haetaan kaikki userit');

    const userId = localStorage.getItem('user_id') || '';

    this.userService.getCampaignsService(userId).subscribe({
      next: (res: any) => {
        this.users = res.data;

        this.usersSize = this.users.length;
        console.log('USERIT' + JSON.stringify(this.users));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleUsers() {
    if (this.btnStatus === 'Hide') {
      this.btnStatus = 'Show';
    } else {
      this.btnStatus = 'Hide';
    }
  }
}
