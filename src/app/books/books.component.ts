import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books : Book[] = [];

  formGroupBook : FormGroup;


 constructor(private formBuilder : FormBuilder,
             private service : BookService){
  this.formGroupBook = formBuilder.group({
    id : [''],
    title : [''],
    author : [''],
    publi : [''],
    price : [''],
  });
 }
  ngOnInit(): void {
    this.loasBooks();
  }
  loasBooks() {
    this.service.getBooks().subscribe({
      next : data => this.books = data
    });
  }
 save(){
  this.service.save(this.formGroupBook.value).subscribe({
    next : data => this.books.push(data)
  });
 }
}
