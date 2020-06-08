import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicI } from '../../../../shared/models/topic.interface';
import { RegisterService } from '../../../../shared/services/register.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent} from './../../../../shared/components/modal/modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.scss']
})
export class ListTopicsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['topic',  'description', 'content', 'actions'];
  dataSource = new MatTableDataSource();
  public idSubject: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private route: ActivatedRoute, private registerSVC: RegisterService, public dialog: MatDialog) { }

  ngOnInit() {
    this.idSubject = this.route.snapshot.params.id;
    this.registerSVC.getAllTopicsOnASubject(this.idSubject).subscribe(topics =>  {
      this.dataSource.data = topics;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNewPost() {
    this.openDialog();
  }

  openDialog( topic?: TopicI): void {
    const idSub = this.route.snapshot.params.id;
    const config = {
      data: {
        message: topic ? 'Editar' : 'Nuevo',
        content: topic,
        idSubject: idSub
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe( result => {
    });
  }

  onDeletePost(topic: TopicI){
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
        this.registerSVC.deleteTopicById(topic).then(() => {
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

}
