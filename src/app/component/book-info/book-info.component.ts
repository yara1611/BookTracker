import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.css'
})
export class BookInfoComponent {
  bookId: string='';
  book:any[]=[];
  query:string='';
  selected:string='';
bookDetails:any;
  constructor(private route: ActivatedRoute, private data:DataService,private api:ApiService) { }

  ngOnInit() {
    this.bookId=this.route.snapshot.paramMap.get('id')||'';
    console.log("BookID:"+this.bookId)
  }
  fetchBook(): void {
    this.api.getBooks('intitle:'+this.query).subscribe((data: any) => {
     this.book=data.items;
    });
  }
  

  
}
