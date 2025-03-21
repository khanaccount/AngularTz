import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, FormsModule], // Добавляем FormsModule
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  user: any = null;
  isEditing = false;
  updatedUser: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.http
        .get(`https://reqres.in/api/users/${userId}`)
        .subscribe((res: any) => {
          this.user = res.data;
          this.updatedUser = { ...this.user };
        });
    }
  }

  editUser() {
    this.isEditing = !this.isEditing;
  }

  saveUser() {
    this.http
      .put(`https://reqres.in/api/users/${this.user.id}`, this.updatedUser)
      .subscribe(() => {
        this.user = { ...this.updatedUser };
        this.isEditing = false;
      });
  }

  deleteUser() {
    this.http
      .delete(`https://reqres.in/api/users/${this.user.id}`)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
