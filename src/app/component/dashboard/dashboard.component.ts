import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/Book';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  booksList: Book[] = [];
  bookDetails:any;
  selected:any;
  apiBooks: any;
  query: string='';
  constructor(private data: DataService,private router:Router, private api:ApiService) { }
  //Fetch
  ngOnInit(): void {
    this.getAllBooks();
    
  }

  id: string = '';
  title: string = '';
  author: string = '';
  done: boolean = false;
  update:boolean=false;

  toUpdate(){
    if(this.update)
      this.update=true;
    else
      this.update=false;
    return this.update;
  }


  book: Book = {
    id: '',
    title: '',
    author: '',
    done: '',
    pagesRead:0,
    apiID:''
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

  checkRead() {
    if (this.done)
      return 'Read'
    return 'Not Yet'
  }
  addBook() {
    
      this.book.id = ''
      this.book.title = this.selected.volumeInfo.title;
      this.book.author = this.selected.volumeInfo.authors;
      this.book.done = this.checkRead();
      this.book.apiID=this.selected.id;
      console.log(this.book.title)
      this.data.addBook(this.book)
      this.resetForm();
    

  }
  deleteBook(book: Book) {
    if (window.confirm("Are you sure?"))
      this.data.deleteBook(book)
  }
    newTitle:string=''
    newAuthor:string=''

  getBookInfo(book:Book){
    console.log("getting Books: "+book.id)
    this.router.navigate(['/bookInfo',book.id])
  }

  fetchBook(): void {
    this.api.getBooks('intitle:'+this.query).subscribe((data: any) => {
     this.apiBooks=data.items;
    });
  }

  updateBook(book:Book){
    if(book.done=="Read")
      book.done="Not Yet"
    else
      book.done="Read";
    this.data.updateBook(book)
  }

  onSelected(value:string){
    this.selected=value;
    console.log(this.selected.volumeInfo)
  }
    
    
  }

