import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/Book';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  booksList: Book[] = [];
  constructor(private data: DataService) { }
  //Fetch
  ngOnInit(): void {
    this.getAllBooks();
  }

  id: string = '';
  title: string = '';
  author: string = '';
  done: boolean = false;


  book: Book = {
    id: '',
    title: '',
    author: '',
    done: ''
  }

  resetForm() {
    this.id = ''
    this.title = '';
    this.author = '';
    this.done = false;
  }

  getAllBooks() {
    this.data.getAllBooks().subscribe(res => {
      this.booksList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert(err + ": Error while fetching data");
    })
  }

  checkRead(book: Book) {
    if (this.done)
      return 'Read'
    return 'Not Yet'
  }
  addBook() {
    if (this.title == '' || this.author == '') {
      alert('Fill all inputs')
    } else {
      this.book.id = ''
      this.book.title = this.title;
      this.book.author = this.author;
      this.book.done = this.checkRead(this.book);
      this.data.addBook(this.book)
      this.resetForm();
    }

  }
  deleteBook(book: Book) {
    if (window.confirm("Are you sure?"))
      this.data.deleteBook(book)
  }
}
