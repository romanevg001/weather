import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ListUser } from '../users.model';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: ListUser[] = [];

  constructor(
    private _usersService: UsersService,
    private _shareService: ShareService
  ) { 
    this.getList();
  }

  ngOnInit() {
  }

  getList(){
    this._shareService.loaderHandler('show');
    this._usersService.getUsers().subscribe((userList)=>{
      this._shareService.loaderHandler('hide');
      this.userList = userList;
      console.log(userList)
    })
  }

}
