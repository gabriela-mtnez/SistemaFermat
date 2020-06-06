import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent} from './../modal/modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['contentPost', 'titlePost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private postSVC: PostService, public dialog: MatDialog) { }

  ngOnInit() {
    this.postSVC.getAllPosts().subscribe(posts => this.dataSource.data = posts);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post: PostI) {
    console.log('Edit post', post);
    this.openDialog(post);
  }

  onDeletePost(post: PostI) {
    console.log('Delete post', post);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No será posible revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.postSVC.deletePostById(post).then(() => {
          Swal.fire(
            'Eliminado',
            'El elemento ha sido eliminado.',
            'success'
          );
        }).catch((error) => {
          Swal.fire(
            'Error ',
            'Ha ocurrido un error al intentar eliminar este elemento.',
            'error'
          );
        });
      }
    });
  }

  onNewPost() {
    this.openDialog();
  }

  openDialog( post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Editar' : 'Nuevo',
        content: post
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe( result => {
      console.log('Dialog result ${result}');
    });
  }
}
