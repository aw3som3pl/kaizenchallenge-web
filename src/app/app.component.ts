import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kaizenchallenge-web';

  constructor( public translate: TranslateService) {
    translate.addLangs(['pl']);
    translate.setDefaultLang('pl');
  }

  ngOnInit(): void {
    const colors = new Map([
      ['darkblue', '#192655'],
      ['blue', '#374785'],
      ['green', '#69AA56'],
      ['red', '#E35151'],
      ['orange', '#F5800C'],
      ['white', '#ffffff'],
      ['lightgrey', '#F4F4F4'],
      ['grey', '#E1E1E1'],
      ['black', '#000000'],
    ]);

    Array.from(colors.entries()).forEach(([name, value]) => {
      document.body.style.setProperty(`--${name}`, value);
    });
  }
}
