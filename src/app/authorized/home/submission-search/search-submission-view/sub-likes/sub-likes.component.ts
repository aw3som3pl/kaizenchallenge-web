import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sub-likes',
  templateUrl: './sub-likes.component.html',
  styleUrls: ['./sub-likes.component.css']
})
export class SubLikesComponent implements OnInit {

  @Input() submissionId;

  constructor() { }

  ngOnInit(): void {
  }

}
