import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubCommentsService} from './service/sub-comments.service';
import {ParseService} from '../../../../../shared/parsers/parse.service';
import {TranslateService} from '@ngx-translate/core';
import {distinctUntilChanged} from 'rxjs/operators';
import {NewComment} from '../../../../../shared/models/NewComment';
import {InewCommentResponse} from '../../../../../shared/models/response/interfaces/inew-comment-response';
import {CommentsListingRequest} from '../../../../../shared/models/request/CommentsListingRequest';
import {IcommentsListingResponse} from '../../../../../shared/models/response/interfaces/icomments-listing-response';
import {Icomment} from '../../../../../shared/models/interfaces/icomment';

@Component({
  selector: 'app-sub-comments',
  templateUrl: './sub-comments.component.html',
  styleUrls: ['./sub-comments.component.css']
})
export class SubCommentsComponent implements OnInit {

  @ViewChild('commentsContainer') private commentsScrollContainer: ElementRef;

  @Input() submissionId;

  isSendingComment = false;

  areCommentsLoaded: boolean;
  commentsListing: [Icomment] = null;

  commentForm: FormGroup;

  commentMessageValid: AbstractControl;

  constructor(private subCommentsService: SubCommentsService,
              private formBuilder: FormBuilder,
              public parseService: ParseService,
              public translate: TranslateService) {

    this.commentForm = this.formBuilder.group({
      commentMessage: ['', [Validators.minLength(10)]],
    });

    this.commentMessageValid = this.commentForm.controls.commentMessage;
  }

  ngOnInit(): void {
    this.commentForm.get('commentMessage').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.commentFormForceValidAgain());
    this.loadCommentsList();
  }

  commentFormForceValidAgain(): void {
    this.commentMessageValid.updateValueAndValidity();
  }

  sendNewComment() {
    if (this.commentForm.valid){
      this.isSendingComment = true;
      const newComment = new NewComment(this.commentMessageValid.value, this.submissionId);
      this.subCommentsService.sendNewComment(newComment)
        .then( (success: InewCommentResponse) => {
          console.log(success);
          this.loadCommentsList();
          this.commentForm.reset();
          this.isSendingComment = false;
        },
          failure => {
            this.isSendingComment = false;
          });
    }
  }

  updateCommentsList() {

  }

  loadCommentsList() {
    this.areCommentsLoaded = false;
    this.subCommentsService.getCommentsList( new CommentsListingRequest(10, 0, this.submissionId))
      .then((success: IcommentsListingResponse) => {
        this.areCommentsLoaded = true;
        console.log(success);
        if (success.comments.length > 0) {
          this.commentsListing = success.comments;
       //   this.commentsListing = [...this.commentsListing];
        }
      },
        failure => {
          this.areCommentsLoaded = true;
          this.commentsListing = null;
        }
      );
  }

  trackByCommentId(index: number, el: Icomment): number {
    return el.commentId;
  }

  scrollToBottom(): void {
    try {
      this.commentsScrollContainer.nativeElement.scrollTop = this.commentsScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
