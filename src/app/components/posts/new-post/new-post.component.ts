import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../../shared/services/register.service';
import { TopicI } from '../../../shared/models/topic.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  @Input() register: string;
  private image: any;
  constructor(private registerSvc: RegisterService, private route: ActivatedRoute) { }
  public idSubject: any;
  public newTopicForm = new FormGroup({
    // id?: string;
    idsubject: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  // public newPostForm = new FormGroup({
  //   titlePost: new FormControl('', Validators.required),
  //   contentPost: new FormControl('', Validators.required),
  //   imagePost: new FormControl('', Validators.required)
  // });

  ngOnInit() {
  }

  addNewPost( data: TopicI ){
    this.registerSvc.preAddAndUpdatePost(data, this.image, this.register);
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}
