import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing} from './app.routing';
import { LoginComponent } from './login/login.component';
import { AngularSvgIconModule} from 'angular-svg-icon';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModules} from './material.module';
import { StaticElementsComponent } from './authorized/static-elements/static-elements.component';
import { SubmissionComponent } from './authorized/submission/submission.component';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './authorized/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarRatingComponent,
    StaticElementsComponent,
    SubmissionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularSvgIconModule.forRoot(),
    routing,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModules,
    ReactiveFormsModule,
    ChartsModule,
    TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
