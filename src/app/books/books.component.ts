import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books : Book[] = [];

  formGroupBook : FormGroup;

  isError : boolean = false;

 constructor(private formBuilder : FormBuilder,
             private service : BookService){
  this.formGroupBook = formBuilder.group({
    id : [''],
    title : ['', [Validators.required, Validators.minLength(1)]],
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
  this.isError = true;

  if (this.formGroupBook.valid) {
    this.service.save(this.formGroupBook.value).subscribe({
      next : data => this.books.push(data)
    });
    this.formGroupBook.reset();
    this.isError = false;
  }
 }
 delete(book : Book){
  this.service.delete(book).subscribe({
    next : () => this.loasBooks()
  });
 }

 get title() : any{
   return this.formGroupBook.get("title")
 }

}
