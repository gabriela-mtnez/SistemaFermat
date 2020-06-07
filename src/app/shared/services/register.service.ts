import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StudentOrTeacherI } from '../models/studentOrTeacher.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registersCollection: AngularFirestoreCollection<StudentOrTeacherI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.registersCollection = afs.collection<StudentOrTeacherI>('registers'); //aqui se pone el nombre que tiene la colección en firebase
  }

  public saveRegister(register: StudentOrTeacherI) {
    const registerObj = {
      rol: register.rol,
      name: register.name,
      birthdate: register.birthdate,
      email: register.email,
      password: register.password,
      address: register.address,
      phone: register.phone,
      average: register.average,
      schoolOfOrigin: register.schoolOfOrigin,
      option: register.option,
      speciality: register.speciality
    };
    // return this.registersCollection.add(registerObj);
    return new Promise((resolve, reject) => {
      this.registersCollection.add(registerObj)
        .then(userData => resolve(userData),
        err =>  reject(err));
    });
  }

  // public getAllRegisters(): Observable<StudentOrTeacherI[]> {
  //   return this.registersCollection
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions =>
  //         actions.map(a => {
  //           const data = a.payload.doc.data() as StudentOrTeacherI;
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         })
  //       )
  //     );
  // }

  public getStudentsRegisters(): Observable<StudentOrTeacherI[]> {
    return this.afs.collection<StudentOrTeacherI>('registers', ref => ref.where('rol', '==', 'student'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as StudentOrTeacherI;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public getTeachersRegisters(): Observable<StudentOrTeacherI[]> {
    return this.afs.collection<StudentOrTeacherI>('registers', ref => ref.where('rol', '==', 'teacher'))
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as StudentOrTeacherI;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public getOneRegister(id: StudentOrTeacherI): Observable<StudentOrTeacherI> {
    return this.afs.doc<StudentOrTeacherI>(`posts/${id}`).valueChanges();
  }

  public editRegisterById(register: StudentOrTeacherI) {
    return this.registersCollection.doc(register.id).update(register);
  }

  public deleteRegisterById(register: StudentOrTeacherI ) {
    return this.registersCollection.doc(register.id).delete();
  }

  // public preAddAndUpdatePost(post: PostI, image: FileI){
  //   this.uploadImage(post, image);
  // }

  // private savePost(post: PostI){
  //   const postObj = {
  //     titlePost: post.titlePost,
  //     contentPost: post.contentPost,
  //     imagePost: this.downloadURL,
  //     fileRef: this.filePath
  //   };
  //   if (post.id) {
  //     return this.postsCollection.doc(post.id).update(postObj);
  //   } else {
  //     return this.postsCollection.add(postObj);
  //   }
  // }

  // private uploadImage(post: PostI, image: FileI) {
  //   this.filePath = `images/${image.name}`;
  //   const fileRef = this.storage.ref(this.filePath);
  //   const task = this.storage.upload(this.filePath, image);
  //   task.snapshotChanges()
  //   .pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe( urlImage => {
  //         this.downloadURL = urlImage;
  //         this.savePost(post);
  //       });
  //     })
  //   ).subscribe();
  // }
}


