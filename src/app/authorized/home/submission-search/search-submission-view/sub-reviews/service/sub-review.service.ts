import { Injectable } from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IsubmissionReviewsResponse} from '../../../../../../shared/models/response/interfaces/isubmission-reviews-response';
import {ReviewerRequest} from '../../../../../../shared/models/request/ReviewerRequest';
import {IreviewerResponse} from '../../../../../../shared/models/response/interfaces/ireviewer-response';
import {EsubmissionStatusEnum} from '../../../../../../shared/enums/Esubmission-status.enum';
import {Erole} from '../../../../../../shared/enums/Erole.enum';
import {EsubmissionTypeEnum} from '../../../../../../shared/enums/Esubmission-type.enum';
import {FormGroup} from '@angular/forms';
import {NewReview} from '../../../../../../shared/models/NewReview';
import {InewReviewResponse} from '../../../../../../shared/models/response/interfaces/inew-review-response';
import {SessionService} from '../../../../../../shared/services/session.service';
import {Ireviewer} from '../../../../../../shared/models/interfaces/ireviewer';
import {Reviewer} from '../../../../../../shared/models/Reviewer';
import {SubmissionContent} from '../../../../../../shared/models/SubmissionContent';
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';
import {EreviewersSourceEnum} from '../../../../../../shared/enums/Ereviewers-source.enum';


@Injectable({
  providedIn: 'root'
})
export class SubReviewService {

  constructor(private http: HttpClient,
              private sessionService: SessionService) { }

  getSubmissionReviews(submissionId: number): Promise<any> {
    console.log(submissionId);
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${environment.getSubmissionReviewsEndpointURL}/${submissionId}`)
        .subscribe( (data: IsubmissionReviewsResponse) => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  getNextReviewersListFromDatabase(searchParams: ReviewerRequest): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.getReviewerListEndpointURL, JSON.stringify(searchParams))
        .subscribe( (data: IreviewerResponse) => {
            console.log(JSON.stringify(data));
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  prepareReviewerRequestObj(targetAreas: [], submissionType: number, newReviewStatus: number): ReviewerRequest {
    return new ReviewerRequest(
      this.determineNextReviewerAreas(targetAreas, this.sessionService.getUserRole()),
      this.determinePossibleNextReviewerRoles(newReviewStatus, submissionType, this.sessionService.getUserRole(), this.sessionService.getUserRole()));

  }

  getNextReviewersListFromHistory(loadedSubmission: SubmissionContent): [Ireviewer]{
    const reviewersFromHistory = [];
    const reviewersIds = [];

    const currentUser = this.sessionService.getUserData();

    for (const entry of loadedSubmission.history){  // POTEM PO JEDNYM Z KAŻDEGO CO SIE UDZIELAŁ
      if (entry.userRole !== null
        && entry.userRole <= currentUser.role
        && entry.userId !== currentUser.uId
        && !reviewersIds.find(id => id === entry.userId))
      {
        reviewersIds.push(entry.userId);
        reviewersFromHistory.push(new Reviewer(null, null, entry.userId, entry.entityName, entry.userRole));
      }
    }
    console.log(reviewersFromHistory);
    return reviewersFromHistory as [Ireviewer];
  }



  determinePossibleReviewOptions(submissionType: number, currentStatus: number): number[]{

    const currentUserRole = this.sessionService.getUserRole();
    const s = EsubmissionStatusEnum;
    const r = Erole;
    const t = EsubmissionTypeEnum;

    switch (currentUserRole) {
      case r.LEADER:
        switch (submissionType) {
          case t.IDEA:
          case t.PROBLEM:
            switch (currentStatus) {
              case s.DO_POPRAWY:
                return [s.ZATWIERDZONO_LIDER];
              case s.DO_SPRAWDZENIA_LIDER:
              case s.NOWE_ZGLOSZENIE:
                return [s.DO_POPRAWY, s.ZATWIERDZONO_LIDER];
              default:
                return null;
            }
          default: return null;
        }
      case r.SUPERVISOR:
        switch (submissionType) {
          case t.IDEA:
            switch (currentStatus) {
              case s.DO_POPRAWY:
                return [s.ZATWIERDZONO_KIEROWNIK];
              case s.DO_SPRAWDZENIA_KIEROWNIK:
                return [s.DO_POPRAWY, s.ZATWIERDZONO_KIEROWNIK];
              default:
                return null;
            }
          case t.PROBLEM:
            switch (currentStatus) {
              case s.DO_POPRAWY:
                return [s.ZATWIERDZONO_KIEROWNIK];
              case s.DO_SPRAWDZENIA_KIEROWNIK:
              case s.NOWE_ZGLOSZENIE:
                return [s.DO_POPRAWY, s.ZATWIERDZONO_KIEROWNIK];
              default:
                return null;
            }
          default: return null;
        }
      case r.COORDINATOR:
        switch (submissionType) {
          case t.IDEA:
            switch (currentStatus) {
              case s.DO_POPRAWY:
                return [s.ZATWIERDZONO_KOORDYNATOR, s.ZMIANA_RECENZENTA];
              case s.DO_SPRAWDZENIA_KOORDYNATOR:
                return [s.DO_POPRAWY, s.WDROZONE, s.ZMIANA_RECENZENTA, s.ARCHIWUM];
              case s.ZATWIERDZONO_KOORDYNATOR:
                return [s.WDROZONE, s.ARCHIWUM];
              case s.WDROZONE:
                return [s.ARCHIWUM];
              case s.ARCHIWUM:
                return null;
              default:
                return [s.ZMIANA_RECENZENTA, s.ARCHIWUM];
            }
          case t.PROBLEM:
            switch (currentStatus) {
              case s.DO_POPRAWY:
                return [s.ZATWIERDZONO_KOORDYNATOR, s.ZMIANA_RECENZENTA];
              case s.DO_SPRAWDZENIA_KOORDYNATOR:
              case s.NOWE_ZGLOSZENIE:
                return [s.DO_POPRAWY, s.ROZWIAZANY, s.ZMIANA_RECENZENTA, s.ARCHIWUM];
              case s.ZATWIERDZONO_KOORDYNATOR:
                return [s.ROZWIAZANY, s.ARCHIWUM];
              case s.ROZWIAZANY:
                return [s.ARCHIWUM];
              case s.ARCHIWUM:
                return null;
              default:
                return [s.ZMIANA_RECENZENTA, s.ARCHIWUM];
            }
          default:
            return null;
        }
      case r.ADMIN: // admin nie recenzuje
        return null;
      case r.SYS_ADMIN:
        const statusArray = Array.from(Array(13).keys());
        statusArray.splice(0, 1); // bez NOWE ZGLOSZENIE
        statusArray.splice(0, 1); // bez EDYCJA
        return statusArray;
      default:
        return null;
    }
  }

  determinePossibleNextReviewerRoles(nextStatus: number, submissionType: number, currentUserRole: number, currentReviewerRole: number): number[] {

    console.log('NEXT STATUS: ' + nextStatus);
    console.log('ROLE: ' + currentUserRole);

    const s = EsubmissionStatusEnum;
    const t = EsubmissionTypeEnum;
    const r = Erole;
    switch (submissionType) {
      case t.IDEA:
        switch (nextStatus) {
          case s.EDYCJA:
            return null;
          case s.DO_POPRAWY:
          case s.WDROZONE:
          case s.ROZWIAZANY:
          case s.ARCHIWUM:
            break;
          case s.DO_SPRAWDZENIA_LIDER:
            return [r.LEADER];
          case s.DO_SPRAWDZENIA_KIEROWNIK:
            return [r.SUPERVISOR];
          case s.DO_SPRAWDZENIA_KOORDYNATOR:
            return [r.COORDINATOR];
          case s.ZATWIERDZONO_LIDER:
            return [r.SUPERVISOR];
          case s.ZATWIERDZONO_KIEROWNIK:
            return [r.COORDINATOR];
          case s.ZATWIERDZONO_KOORDYNATOR:
            break;
          case s.ZMIANA_RECENZENTA:
            return [currentReviewerRole];
          default:
            break;
        }
        break;
      case t.PROBLEM:
        switch (nextStatus) {
          case s.EDYCJA:
            return null;
          case s.DO_POPRAWY:
          case s.WDROZONE:
          case s.ROZWIAZANY:
          case s.ARCHIWUM:
            break;
          case s.DO_SPRAWDZENIA_LIDER:
            return [r.LEADER];
          case s.DO_SPRAWDZENIA_KIEROWNIK:
            return [r.SUPERVISOR];
          case s.DO_SPRAWDZENIA_KOORDYNATOR:
            return [r.COORDINATOR];
          case s.ZATWIERDZONO_LIDER:
            return [r.COORDINATOR];
          case s.ZATWIERDZONO_KIEROWNIK:
            return [r.COORDINATOR];
          case s.ZATWIERDZONO_KOORDYNATOR:
            break;
          case s.ZMIANA_RECENZENTA:
            return [currentReviewerRole];
          default:
            break;
        }
    }

    switch (currentUserRole) {
      case r.SYS_ADMIN:
        const roleArray = Array.from(Array(5).keys());
        roleArray.splice(0, 1); // bez UZYTKOWNIK
        return roleArray;
      default:
        return null;
    }
  }

  determineNextReviewerAreas(submissionAreas: number[], reviewerRole: number): number[] {

    console.log('SUBMISSION AREAS: ' + submissionAreas);
    console.log('ROLE: ' + reviewerRole);

    const r = Erole;

    switch (reviewerRole) {
      case r.SYS_ADMIN:
        return Array.from(Array(21).keys());
      default:
        return submissionAreas;
    }
  }

  determineReviewerSource(reviewStatus: EsubmissionStatusEnum): number {

    const r = EsubmissionStatusEnum;
    const rs = EreviewersSourceEnum;

    switch (reviewStatus) {
      case r.DO_POPRAWY:
        return rs.FROM_HISTORY;
      case r.ROZWIAZANY:
      case r.EDYCJA:
      case r.WDROZONE:
      case r.ARCHIWUM:
      case r.ZATWIERDZONO_KOORDYNATOR:
        return rs.NO_REVIEWER;
      default:
        return rs.FROM_DATABASE;
    }
  }

  sendReviewData(reviewForm: FormGroup, currentReviewerId: number, submissionId: number): Promise<any> {

    const s = EsubmissionStatusEnum;

    let reviewBody;
    let isEditorAssigned = false;

    if (reviewForm.get('reviewStatus').value === s.DO_POPRAWY){
      isEditorAssigned = true;
    }

    if (isEditorAssigned){
      reviewBody = this.prepareCorrectionReviewObject(reviewForm, submissionId, currentReviewerId, reviewForm.get('nextReviewer').value.reviewerId);
    } else {
      reviewBody = this.prepareAdvancingReviewObject(reviewForm, submissionId, currentReviewerId);
    }

    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.sendNewSubmissionReviewDataEndpointURL,
        JSON.stringify(reviewBody))
        .subscribe( (data: InewReviewResponse) => {
            console.log(JSON.stringify(data));
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  prepareAdvancingReviewObject(reviewForm: FormGroup, submissionId: number, currentReviewerId: number): NewReview {

    let nextReviewerId = currentReviewerId;

    if (reviewForm.get('nextReviewer').value){
      nextReviewerId = reviewForm.get('nextReviewer').value.reviewerId;
    }
    const newReview = new NewReview(
      reviewForm.get('reviewMessage').value,
      reviewForm.get('reviewStatus').value,
      nextReviewerId,
      submissionId,
      null);  // Null bo nikt nie edytuje
    console.log(newReview);
    return newReview;
  }

  prepareCorrectionReviewObject(reviewForm: FormGroup, submissionId: number, currentReviewerId: number, editorId: number): NewReview {
    const newReview = new NewReview(
      reviewForm.get('reviewMessage').value,
      reviewForm.get('reviewStatus').value,
      currentReviewerId,  // ID recenzenta
      submissionId,
      editorId);    // ID tego co ma poprawić
    console.log(newReview);
    return newReview;
  }

  checkIsNewReviewerRequired(nextReviewStatus: number): boolean {
    const s = EsubmissionStatusEnum;

    switch (nextReviewStatus){
      case null:
        return false;
      case s.ZATWIERDZONO_KOORDYNATOR:
      case s.ARCHIWUM:
      case s.ROZWIAZANY:
      case s.WDROZONE:
        return false;
      default:
        return true;
    }
  }

  checkIsReviewer(assignedReviewerId: number): boolean{

    const r = Erole;

    switch (this.sessionService.getUserRole()) {
      case r.SYS_ADMIN:
        return true;
      default:
        break;
    }

    return this.sessionService.getUserId() === assignedReviewerId;
  }

}
