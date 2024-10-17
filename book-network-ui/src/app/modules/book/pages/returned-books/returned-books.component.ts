import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit{

  message = '';
  level = 'success';
  page = 0;
  size = 5;
  returnedBooks: PageResponseBorrowedBookResponse = {};
 
  constructor(
    private bookService: BookService,
  ) {
  }
  ngOnInit(): void {
    this.findAllReturnedBooks();
  }
  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
      }
    });
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      this.level = 'error'
      this.message = ' The book is not yet returned'
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved';
        this.findAllReturnedBooks();
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }
  goToPreviousPage() {
    this.page --;
    this.findAllReturnedBooks();
  }
  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }
  get isLastPage() {
    return this.page === this.returnedBooks.totalPages as number - 1;
  }
}
