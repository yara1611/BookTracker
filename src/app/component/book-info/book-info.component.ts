import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { delay, timeInterval } from 'rxjs';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css'
})
export class BookInfoComponent {
  bookId: string='';
  APIid: string='';
  bookDetails:any;
  apiBookDetails:any;
  constructor(private route: ActivatedRoute, private data:DataService,private api:ApiService) { }

  ngOnInit() {
    this.bookId=this.route.snapshot.paramMap.get('id')||'';
   
    console.log("BookID:"+this.bookId)
    
    this.loadData();
    
    
  }
  loadData(){
    this.data.getBook(this.bookId).subscribe(
      (snapshot) => {
        if (snapshot.payload.exists) {
          this.bookDetails = snapshot.payload.data();
          this.getBookById()
         
        } else {
          console.log('Book does not exist');
        }
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  getBookById(){
    this.api.getBookById(this.bookDetails.apiID).subscribe(
      (data) => {
          this.apiBookDetails = data;
          console.log(this.apiBookDetails);
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }



  
}
