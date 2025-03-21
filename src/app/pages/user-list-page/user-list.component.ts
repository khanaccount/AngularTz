import { Component, inject, OnInit } from '@angular/core';
import { ResourcesService } from './../../data/services/resources.services';
import { ResourcesResponse } from '../../data/interface/resources.interface';
import { UsersService } from '../../data/services/users.services';
import { UsersResponse } from '../../data/interface/users.interface';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  usersService = inject(UsersService);
  ResourcesService = inject(ResourcesService);
  resources: ResourcesResponse | null = null;
  users: UsersResponse | null = null;
  pageIndex: number = 1;
  pageSize: number = 6;
  length: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadResources();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
    this.loadResources();
  }

  loadUsers(): void {
    this.usersService.getUsers(this.pageIndex).subscribe({
      next: (val) => {
        this.users = val;
        this.length = val.total;
      },
      error: (err) => {
        console.error('Ошибка при загрузке пользователей:', err);
        this.users = null;
      },
    });
  }
  loadResources(): void {
    this.ResourcesService.getResources().subscribe({
      next: (val) => {
        this.resources = val;
      },
      error: (err) => {
        console.error('Ошибка при загрузке ресурсов:', err);
        this.resources = null;
      },
    });
  }
  goToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
