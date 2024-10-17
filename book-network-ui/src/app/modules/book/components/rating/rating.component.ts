import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();
  maxRating: number = 5;
  get fullStars(): number {
    return Math.floor(this.rating);
  }
  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0; // if whole number 0 false else !0 true
  }
  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }
}