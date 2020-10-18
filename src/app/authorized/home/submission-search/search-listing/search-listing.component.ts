import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ParseService} from '../../../../shared/parsers/parse.service';
import {SubmissionListingRequest} from '../../../../shared/models/request/SubmissionListingRequest';
import {Submission} from '../../../../shared/models/Submission';
import {SearchListingService} from './service/search-listing.service';
import {IsubmissionListingResponse} from '../../../../shared/models/response/interfaces/isubmission-listing-response';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchListingComponent implements OnInit {

  isLoadingSubmissions;

  // Listing request
  private newListingRequest: SubmissionListingRequest;
  // Subscriptions
  private subscriptions = new Subscription();

  // Listing table
  submissionsTableHeaders = ['Więcej', 'ID', 'Status', 'Autor', 'Kategoria', 'Aktywność', 'Data zgłoszenia'];
  expandedSubmission: Submission | null;
  submissionListing: [Submission];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private searchListingService: SearchListingService,
              public parseService: ParseService) { }

  ngOnInit(): void {

    const newListingSub = this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.newListingRequest = new SubmissionListingRequest(
          params.has('areas') ? params.getAll('areas').map(Number) : null,
          params.has('authorType') ? +params.get('authorType') : null,
          params.has('currentPageSize') ?  +params.get('currentPageSize') : 10,
        params.has('category') ? params.getAll('category').map(Number) : null,
        params.has('orderBy') ? params.getAll('orderBy').map(Number) : null,
          params.has('currentStartIndex') ? +params.get('currentStartIndex') :  0,
        params.has('status') ? params.getAll('status').map(Number) : null,
      params.has('timestampSearchEnd') ? params.get('timestampSearchEnd') : null,
          params.has('timestampSearchStart') ? params.get('timestampSearchStart') : null,
        params.has('type') ? params.getAll('type').map(Number) : null);
        console.log(this.newListingRequest);

        this.loadFilteredSubmissions(this.newListingRequest);
      });

    this.subscriptions.add(newListingSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadFilteredSubmissions(request: SubmissionListingRequest){
    this.isLoadingSubmissions = true;

    this.searchListingService.loadSubmissionsList(request)
      .then( (success: IsubmissionListingResponse) => {
        this.isLoadingSubmissions = false;

        console.log(this.submissionListing);
        if (success.searchResult.length > 0){
          this.submissionListing = success.searchResult;
        } else {
          this.submissionListing = null;
        }
        this.updateLoadedSubmissionsCount(success.searchResultCount);
      },
        failure => {
        this.isLoadingSubmissions = false;
        this.submissionListing = null;
        });
  }

  updateLoadedSubmissionsCount(count: number){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        currentSubmissionsCount: count.toString(),
      },
      queryParamsHandling: 'merge'
    });
  }

  openSubmissionViewById(submissionId: number){
    console.log(submissionId);
    this.router.navigate(['submission'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        submissionId: submissionId.toString(),
        activeTab: '0'
      },
      queryParamsHandling: 'merge'
    });
  }

}
