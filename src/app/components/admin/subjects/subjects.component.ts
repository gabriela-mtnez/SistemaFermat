import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../shared/services/register.service';
import { SubjectI } from '../../../shared/models/subject.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public subjects$: Observable<SubjectI[]>;
  constructor(private subjectSvc: RegisterService) { }

  ngOnInit() {
    this.subjects$ = this.subjectSvc.getAllSubjects();
  }

}
