import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Observable, Subject, Subscription, distinctUntilChanged, map, switchMap } from 'rxjs';
import { Book } from './models/models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { volume } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sample';

  private query = new Subject<string>;
  protected books$!: Observable<Book[]>;

  public form!: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      query: ''
    });
    this.pushQuery();
  }

  ngOnDestroy(): void {
  }

  private pushQuery() {
    this.books$ = this.query.pipe(
      distinctUntilChanged(),
      switchMap((query: string) => {
        return this.api.searchVolume(query);
      })
    )
  }

  protected onSubmit() {
    this.query.next(this.form.get('query')?.value);
  }

}
