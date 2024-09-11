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
    pagesRead:0
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
      this.book.title = this.selected.title;
      this.book.author = this.selected.authors;
      this.book.done = this.checkRead();
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
  updateBook(book:Book){
    book.title = this.newTitle
    book.author=this.newAuthor
    this.data.updateBook(book);
  }

  getBookInfo(book:Book){
    console.log("getting Books: "+book.id)
    // this.data.getBook(book).subscribe(
    //   (snapshot) => {
    //     if (snapshot.payload.exists) {
    //       this.bookDetails = snapshot.payload.data();
          this.router.navigate(['/bookInfo',book.id])
    //     } else {
    //       console.log('Book does not exist');
    //     }
    //   },
    //   (error) => {
    //     console.error('Error fetching book details:', error);
    //   }
    // );
  }

  fetchBook(): void {
    this.api.getBooks('intitle:'+this.query).subscribe((data: any) => {
     this.apiBooks=data.items;
    });
  }

  onSelected(value:string){
    this.selected=value;
    console.log(this.selected)
  }
    
    
  }

