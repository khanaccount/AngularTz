import { Component, inject } from '@angular/core';
import { UsersService } from '../data/services/users.services';
import { UsersResponse } from '../data/interface/users.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-user-list',
  imports: [MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  usersService = inject(UsersService);
  users: UsersResponse | null = null;
  constructor() {
    this.usersService.getUsers().subscribe((val) => (this.users = val));
  }
}
