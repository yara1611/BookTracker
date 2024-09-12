import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class DataService  {

  
  constructor(private afs:AngularFirestore) {
    this.userID=localStorage.getItem('userID')||''
    
   }
userID:string='';

  addBook(book:Book){
    book.id=this.afs.createId();
    book.userID=this.userID;
    return this.afs.collection('/Books').add(book);
  }
 
  getAllBooks(){
    return this.afs.collection('/Books',ref => ref.where('userID', '==', this.userID)).snapshotChanges();
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

  //User's
 
}
