import { Component, OnInit } from '@angular/core';
import { Led } from '../model/led';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pi-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent implements OnInit {
  color = 'red';

  readonly min = 3;

  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      color: new FormControl(this.color, {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'change'
      })
    });

    this.form.statusChanges.subscribe({
      next: res => console.log(res)
    });

    this.form
      .get('color')
      .valueChanges.pipe(
        debounceTime(300),
        tap(value => console.log(value))
      )
      .subscribe();
  }

  updateColor(value: Pick<Led, 'color'>) {
    console.log(value);
  }
}
