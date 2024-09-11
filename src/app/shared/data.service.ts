import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../model/Book';
@Injectable({
  providedIn: 'root'
})
export class DataService  {

  constructor(private afs:AngularFirestore) { }

  addBook(book:Book){
    book.id=this.afs.createId();
    return this.afs.collection('/Books').add(book);
  }

  getAllBooks(){
    return this.afs.collection('/Books').snapshotChanges();
  }

  deleteBook(book: Book){
    return this.afs.doc('/Books/'+book.id).delete();
  }

  getBook(bookId:string){
   return this.afs.doc('/Books/'+bookId).snapshotChanges();
  }

  updateBook(book:Book){
    this.deleteBook(book);
    this.addBook(book);
  }

  // duplicates(title:string){
  //   return this.afs.doc('/Books/'+boo)
  // }
}
