import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { User } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  _destroy$ = new Subject<void>();

  termFormControl = new FormControl();

  heroes: User[] = [];

  heroes$!: Observable<User[]>;

  heroFormGroup = new FormGroup({
    // id: new FormControl(),
    Email: new FormControl(),
    Todo1:new FormControl(),
    Todo2:new FormControl(),
    Todo3:new FormControl(),
  })

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {

    // this.termFormControl.valueChanges
    //   .subscribe(
    //     value => this.heroService.searchHero(value)
    //       .subscribe(
    //         hs => this.heroes = hs
    //       ));

    // X => Y
    // term: string => heroes: Hero[]
    // term => (async) API  => heroes: Hero[]
    // this.termFormControl.valueChanges
    //   .pipe(
    //     switchMap(value => this.heroService.searchHero(value))
    //   ).subscribe(
    //     hs => this.heroes = hs
    //   );

    // X => Y
    this.heroes$ = this.termFormControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.accountService.searchHero(value))
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  onSubmit() {
    if (this.heroFormGroup.get('Email')?.value) {
      this.accountService
        .updateHero(this.heroFormGroup.getRawValue())
        // .subscribe(() => this.onBack());
    } else {
      this.accountService
        .addNewHero(this.heroFormGroup.getRawValue())
        // .subscribe(() => this.onBack());
    }
  }
}
