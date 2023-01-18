import { DataService } from './../services/data.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  username: string = '';
  task: string = 'Wash dishes';
  is_done: boolean = false;

  update_task(e: any) {
    this.is_done = e.currentTarget.checked;
  }

  // template driven form using ngmodel
  user: any = {};
  // reactive form
  userForm: FormGroup;
  editUserForm: FormGroup;

  // store all users
  users: any = [];

  // if edit click
  active_edit: boolean = false;

  // update list without refresh
  activeIndex: number = 0;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    // create a new user
    this.userForm = fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });

    // edit user form
    this.editUserForm = fb.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  // demo of lifecycle hooks
  ngOnInit() {
    this.getAllUsers();
  }

  // get all users
  getAllUsers() {
    this.dataService.getRequest('/users').subscribe((response: any) => {
      this.users = response.payload;
    });
  }

  // create user part
  createUser() {
    console.log(this.user);
  }

  createUserReactive() {
    if (this.userForm.valid) {
      this.dataService
        .postRequest('/user', this.userForm.value)
        .subscribe((response: any) => {
          this.users.push({
            ...this.userForm.value,
            id: response.payload.user_id,
          });
          this.userForm.reset();
        });
    }
  }

  // edit user part
  editUserReactive() {
    if (this.editUserForm.valid) {
      this.dataService
        .putRequest('/user', this.editUserForm.value)
        .subscribe((response: any) => {
          this.users[this.activeIndex] = this.editUserForm.value;
          this.active_edit = false;
        });
    }
  }

  showEdit(userdata: any, index: number) {
    this.activeIndex = index;
    this.active_edit = true;
    this.editUserForm.patchValue({
      id: userdata.id,
      username: userdata.username,
      email: userdata.email,
    });
  }

  cancelEdit() {
    this.active_edit = false;
  }

  // delete user
  deleteUser(user_id: number, index: number) {
    this.dataService
      .deleteRequest('/users/' + user_id)
      .subscribe((response: any) => {
        console.log(response);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      });
  }
}
