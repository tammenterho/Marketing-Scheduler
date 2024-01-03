import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {}

  /*
  getAllUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('käyttäjät' + JSON.stringify(this.users));
      },
      (error) => {
        console.error('error fetching users', error);
      }
    );
  }

  showUsers() {
    if (this.color == 'danger') {
      this.color = 'success';
      this.getAllUsers();
    } else {
      this.color = 'danger';
    }
  }

  */
}
