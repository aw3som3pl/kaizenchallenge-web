import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing} from './app.routing';
import { LoginComponent } from './login/login.component';
import { AngularSvgIconModule} from 'angular-svg-icon';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModules} from './material.module';
import { StaticElementsComponent } from './authorized/static-elements/static-elements.component';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './authorized/home/home.component';
import { AdminPanelComponent } from './authorized/admin-panel/admin-panel.component';
import { CommunicatorComponent } from './authorized/communicator/communicator.component';
import { KnowledgebaseComponent } from './authorized/knowledgebase/knowledgebase.component';
import { UsersComponent } from './authorized/users/users.component';
import { CreativityRankingComponent } from './authorized/creativity-ranking/creativity-ranking.component';
import { OeeSimulatorComponent } from './authorized/oee-simulator/oee-simulator.component';
import { SubmissionSearchComponent } from './authorized/submission-search/submission-search.component';
import { SubmissionResultsComponent } from './authorized/submission-results/submission-results.component';
import { NotificationsComponent } from './authorized/notifications/notifications.component';
import { SubContentComponent } from './authorized/submission-search/sub-content/sub-content.component';
import { SubReviewsComponent } from './authorized/submission-search/sub-reviews/sub-reviews.component';
import { SubCommentsComponent } from './authorized/submission-search/sub-comments/sub-comments.component';
import { SubAttachmentsComponent } from './authorized/submission-search/sub-attachments/sub-attachments.component';
import { SubLikesComponent } from './authorized/submission-search/sub-likes/sub-likes.component';
import { SubListingComponent } from './authorized/submission-search/sub-listing/sub-listing.component';
import {IdtokenHeaderInterceptor} from './shared/interceptors/idtoken-header.interceptor';
import {RouterModule} from '@angular/router';
import { FileDropzoneDirective } from './shared/directives/file-dropzone.directive';
import { UploadTaskComponent } from './authorized/home/upload-task/upload-task.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StarRatingComponent,
    StaticElementsComponent,
    HomeComponent,
    AdminPanelComponent,
    CommunicatorComponent,
    KnowledgebaseComponent,
    UsersComponent,
    CreativityRankingComponent,
    OeeSimulatorComponent,
    SubmissionSearchComponent,
    SubmissionResultsComponent,
    NotificationsComponent,
    SubContentComponent,
    SubReviewsComponent,
    SubCommentsComponent,
    SubAttachmentsComponent,
    SubLikesComponent,
    SubListingComponent,
    FileDropzoneDirective,
    UploadTaskComponent
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: IdtokenHeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
