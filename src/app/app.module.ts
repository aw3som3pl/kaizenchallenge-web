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
import { SubmissionSearchComponent } from './authorized/home/submission-search/submission-search.component';
import { SubmissionResultsComponent } from './authorized/home/submission-results/submission-results.component';
import { SubReviewsComponent } from './authorized/home/submission-search/search-submission-view/sub-reviews/sub-reviews.component';
import { SubCommentsComponent } from './authorized/home/submission-search/search-submission-view/sub-comments/sub-comments.component';
import { SubAttachmentsComponent } from './authorized/home/submission-search/search-submission-view/sub-attachments/sub-attachments.component';
import { SubLikesComponent } from './authorized/home/submission-search/search-submission-view/sub-likes/sub-likes.component';
import {IdtokenHeaderInterceptor} from './shared/interceptors/idtoken-header.interceptor';
import { FileDropzoneDirective } from './shared/directives/file-dropzone.directive';
import { UploadTaskComponent } from './authorized/home/submission-create/upload-task/upload-task.component';
import { SubmissionCreateComponent } from './authorized/home/submission-create/submission-create.component';
import { SearchListingComponent } from './authorized/home/submission-search/search-listing/search-listing.component';
import { SearchSubmissionViewComponent } from './authorized/home/submission-search/search-submission-view/search-submission-view.component';
import { SubContentComponent } from './authorized/home/submission-search/search-submission-view/sub-content/sub-content.component';
import { SubHistoryComponent } from './authorized/home/submission-search/search-submission-view/sub-history/sub-history.component';
import { UsersListingComponent } from './authorized/users/users-search/users-listing/users-listing.component';
import { UsersDetailsComponent } from './authorized/users/users-search/users-details/users-details.component';
import { UsersSearchComponent } from './authorized/users/users-search/users-search.component';
import { UploadTaskEditComponent } from './authorized/home/submission-search/search-submission-view/sub-attachments/upload-task-edit/upload-task-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NotificationDialogComponent } from './shared/components/notification-dialog/notification-dialog.component';
import { ChoiceDialogComponent } from './shared/components/choice-dialog/choice-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {projectConfig} from '../config/project-config';
import { UsrProfileComponent } from './authorized/users/users-search/users-details/usr-profile/usr-profile.component';
import { UsrStatsComponent } from './authorized/users/users-search/users-details/usr-stats/usr-stats.component';


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
    SubReviewsComponent,
    SubCommentsComponent,
    SubAttachmentsComponent,
    SubLikesComponent,
    FileDropzoneDirective,
    UploadTaskComponent,
    SubmissionCreateComponent,
    SearchListingComponent,
    SearchSubmissionViewComponent,
    SubContentComponent,
    SubHistoryComponent,
    UsersListingComponent,
    UsersDetailsComponent,
    UsersSearchComponent,
    UploadTaskEditComponent,
    NotificationDialogComponent,
    ChoiceDialogComponent,
    UsrProfileComponent,
    UsrStatsComponent,
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
        AngularFireModule.initializeApp(projectConfig.firebase),
        AngularSvgIconModule.forRoot(),
        routing,
        FormsModule,
        BrowserAnimationsModule,
        AppMaterialModules,
        ReactiveFormsModule,
        ChartsModule,
        TranslateModule,
        MatDialogModule,
        MatBadgeModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: IdtokenHeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
  entryComponents: [NotificationDialogComponent, ChoiceDialogComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
