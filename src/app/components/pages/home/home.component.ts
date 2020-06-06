import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // photos: any[] = [
  //   {
  //     name: 'Clase',
  //     img: 'https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     desc: 'Estas son los niños del futuro.'
  //   },
  //   {
  //     name: 'Matemáticas',
  //     img: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     desc: 'Regularizaciones de matemáticas.'
  //   }
  // ];

  public posts$: Observable<PostI[]>;
  constructor(
    private postSvc: PostService
    // private _config: NgbCarouselConfig
    ) { }

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }

}
