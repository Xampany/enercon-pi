import { Component, ViewChild } from '@angular/core';
import { LedListComponent } from './led-list/led-list.component';

@Component({
  selector: 'pi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(LedListComponent, {
    static: false
  })
  ledList: LedListComponent;

  title = 'Enercon GmbH';

  onRefresh() {
    // this.ledList.doStuff()
  }
}
