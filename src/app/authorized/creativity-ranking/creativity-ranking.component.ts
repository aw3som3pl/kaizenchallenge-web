import { Component, OnInit } from '@angular/core';
import {RankingUser} from '../../shared/models/RankingUser';
import {CreativityRankingService} from './service/creativity-ranking.service';
import {IcreativityRankingListingResponse} from '../../shared/models/response/interfaces/icreativity-ranking-listing-response';
import {ParseService} from '../../shared/parsers/parse.service';
import {Router} from '@angular/router';
import {Submission} from '../../shared/models/Submission';
import {IsubmissionListingResponse} from '../../shared/models/response/interfaces/isubmission-listing-response';

@Component({
  selector: 'app-creativity-ranking',
  templateUrl: './creativity-ranking.component.html',
  styleUrls: ['./creativity-ranking.component.css']
})
export class CreativityRankingComponent implements OnInit {

  isLoadingCreativityRanking = false;

  isLoadingMostActiveIdeas;
  isLoadingMostActiveProblems;

  mostActiveIdeasList: [Submission];
  mostActiveProblemsList: [Submission];

  creativityRankingListing: [RankingUser];

  constructor(private creativityRankingService: CreativityRankingService,
              private router: Router,
              public parseService: ParseService) { }

  ngOnInit(): void {
    this.loadCreativityRankingList();
    this.loadMostActiveIdeas();
    this.loadMostActiveProblems();
  }

  loadCreativityRankingList() {
    this.toggleLoadingIndicator(true);
    this.creativityRankingService.loadCreativityRankingList(this.creativityRankingService.prepareCreativityRankingRequest(30, 0))
      .then((response: IcreativityRankingListingResponse) => {
        if (response.mostActiveUsers ? response.mostActiveUsers.length > 0 : false) {
          this.creativityRankingListing = response.mostActiveUsers;
        } else {
          this.creativityRankingListing = null;
        }
        this.toggleLoadingIndicator(false);
      },
        failure => {
          this.creativityRankingListing = null;
          this.toggleLoadingIndicator(false);
        });
  }

  loadMostActiveIdeas(){
    this.isLoadingMostActiveIdeas = true;

    this.creativityRankingService.loadMostActiveIdeasList()
      .then( (success: IsubmissionListingResponse) => {
          this.isLoadingMostActiveIdeas = false;

          if (success.searchResult.length > 0){
            this.mostActiveIdeasList = success.searchResult;
          } else {
            this.mostActiveIdeasList = null;
          }
        },
        failure => {
          this.isLoadingMostActiveIdeas = false;
          this.mostActiveIdeasList = null;
        });
  }

  loadMostActiveProblems(){
    this.isLoadingMostActiveProblems = true;

    this.creativityRankingService.loadMostActiveProblemsList()
      .then( (success: IsubmissionListingResponse) => {
          this.isLoadingMostActiveProblems = false;

          if (success.searchResult.length > 0){
            this.mostActiveProblemsList = success.searchResult;
          } else {
            this.mostActiveProblemsList = null;
          }
        },
        failure => {
          this.isLoadingMostActiveProblems = false;
          this.mostActiveProblemsList = null;
        });
  }

  openSubmissionViewById(submissionId: number){
    console.log(submissionId);
    this.router.navigate(['authenticated/home/search/submission'], {
      queryParams: {
        submissionId: submissionId.toString(),
        activeTab: '0'
      },
      queryParamsHandling: 'merge'
    });
  }

  navigateToProfile(employeeId: string): void {
    this.router.navigate(['authenticated/users/search/user'], {
        queryParams: {
          userId: employeeId,
          activeTab: 0
        }
      }
    ).then( success => {
    });
  }

  toggleLoadingIndicator(isVisible: boolean){
    this.isLoadingCreativityRanking = isVisible;
  }

}
