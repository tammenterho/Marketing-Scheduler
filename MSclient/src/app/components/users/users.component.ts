import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  color: string = 'success';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

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

  deleteUser(clickedUserId: number): void {
    console.log(clickedUserId);

    const clickedUser = this.users.find(
      (campaign) => campaign.id === clickedUserId
    );

    if (clickedUser) {
      this.userService.deleteUserById(clickedUser).subscribe({
        next: () => {},
        error: (error) => {
          console.error('failed to delete', error);
        },
        complete: () => {
          const index = this.users.findIndex(
            (user) => user.id === clickedUserId
          );
          if (index !== -1) {
            this.users.splice(index, 1);
          }
          this.color = 'danger';
        },
      });
    }
  }
}
