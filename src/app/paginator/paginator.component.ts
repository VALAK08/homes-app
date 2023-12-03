import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  template: '<mat-paginator [length]="totalItems" [pageSize]="pageSize" (page)="onPageChange($event)"></mat-paginator>',
  styleUrls: ['./paginator.component.css']
}) 

export class PaginatorComponent {
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}
