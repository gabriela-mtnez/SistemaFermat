import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StudentOrTeacherI } from '../models/studentOrTeacher.interface';
import { SubjectI } from '../models/subject.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registersCollection: AngularFirestoreCollection<StudentOrTeacherI>;
  private subjectsCollection: AngularFirestoreCollection<SubjectI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.registersCollection = afs.collection<StudentOrTeacherI>('registers'); //aqui se pone el nombre que tiene la colección en firebase
    this.subjectsCollection = afs.collection<SubjectI>('subjects');
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
    if (register.speciality !== '') {
      const subjectObj = {
        teacher: register.name,
        subject: register.speciality
      };
      this.subjectsCollection.add(subjectObj);
    }
    // return this.registersCollection.add(registerObj);
    return new Promise((resolve, reject) => {
      this.registersCollection.add(registerObj)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

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

  public getRegisterById(id): Observable<StudentOrTeacherI> {
    return this.afs.doc<StudentOrTeacherI>(`registers/${id}`).valueChanges();
  }

  public editRegisterById(register: StudentOrTeacherI) {
    return this.registersCollection.doc(register.id).update(register);
  }

  public deleteRegisterById(register: StudentOrTeacherI) {
    return this.registersCollection.doc(register.id).delete();
  }

  public saveMoney(obj) {
    return this.afs.collection<StudentOrTeacherI>('payments').add(obj);
  }

  public getMoneyData(id) {
    return this.afs.collection('payments', ref => ref.where('studentId', '==', id))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data: any = a.payload.doc.data();
            return { ...data };
          })
        )
      );
  }

  public getAllSubjects(): Observable<SubjectI[]> {
    return this.subjectsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as SubjectI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getOneSubject(id: SubjectI): Observable<SubjectI> {
    return this.afs.doc<SubjectI>(`subject/${id}`).valueChanges();
  }

  public getRolUser(email: string) {
    return this.afs.collection<StudentOrTeacherI>('registers', ref => ref.where('email', '==', email))
    .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data: any = a.payload.doc.data();
            return { ...data };
          })
        )
      );
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


