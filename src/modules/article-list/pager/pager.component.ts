import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, range } from 'rxjs';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnChanges {
  @Input() currentPage: number;
  @Input() totalPages: number;
  // @Output() changePage = new EventEmitter();
  pageNumbers: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { totalPages } = changes;
    if (totalPages && totalPages.currentValue !== totalPages.previousValue) {
      this.onTotalPagesChange();
    }
  }

  onTotalPagesChange() {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
}
