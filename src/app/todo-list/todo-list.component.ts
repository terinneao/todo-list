import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { User } from '../account';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() hero?: User;

  heroFormGroup = new FormGroup({
    // Id: new FormControl(),
    // name: new FormControl()
    Email:new FormControl(),
    Todo1:new FormControl(),
    Todo2:new FormControl(),
    Todo3:new FormControl(),
    
  })
  heroes$!: Observable<User[]>;
  heroes: User[] = [];
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private location: Location) { }

  ngOnInit(): void {
    const Email = this.route.snapshot.queryParamMap.get('Email')!;

    if (Email) {
      this.accountService.getHero(Email)
      .subscribe(hero => this.heroFormGroup.setValue(hero));
    }

  }

  onBack() {
    this.location.back();
  }

  onSave() {
    if (this.heroFormGroup.get('Email')?.value) {
      this.accountService
        .updateHero(this.heroFormGroup.getRawValue()) ////////////
        // .subscribe(() => this.onBack());
    } else {
      this.accountService
        .addNewHero(this.heroFormGroup.getRawValue())
        // .subscribe(() => this.onBack());
    }
  }

}
