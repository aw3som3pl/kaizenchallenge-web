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
      ['lightgreen', '#CBDFC5'],
      ['red', '#E35151'],
      ['lightred', '#F1C7C7'],
      ['orange', '#F5800C'],
      ['white', '#ffffff'],
      ['lightgrey', '#F4F4F4'],
      ['grey', '#E1E1E1'],
      ['black', '#000000'],
      ['yellow', '#F7DD7D'],

      // ROLES
      ['USER', '#374785'],
      ['LEADER', '#192655'],
      ['SUPERVISOR', '#F5800C'],
      ['COORDINATOR', '#69AA56'],
      ['ADMIN', '#E35151'],
      ['SYSADMIN', '#000000'],

      // STATUS BORDER / History

      ['NOWE_ZGLOSZENIE', '#F4F4F4'],
      ['EDYCJA', '#ff4000'],
      ['DO_SPRAWDZENIA_LIDER', '#192655'],
      ['ZATWIERDZONO_LIDER', '#192655'],
      ['DO_SPRAWDZENIA_KIEROWNIK', '#F5800C'],
      ['ZATWIERDZONO_KIEROWNIK', '#F5800C'],
      ['DO_SPRAWDZENIA_KOORDYNATOR', '#69AA56'],
      ['ZATWIERDZONO_KOORDYNATOR', '#69AA56'],
      ['WDROZONE', '#59cc33'],
      ['ROZWIAZANY', '#59cc33'],
      ['ARCHIWUM', '#4d0000'],
      ['DO_POPRAWY', '#cc0000'],
      ['ZMIANA_RECENZENTA', '#000000'],
    ]);

    Array.from(colors.entries()).forEach(([name, value]) => {
      document.body.style.setProperty(`--${name}`, value);
    });
  }
}
