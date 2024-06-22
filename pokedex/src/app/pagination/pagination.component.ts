import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input() currentPage: number = 1; // Assign a default value to currentPage
    @Input() itemsPerPage: number = 100;
    @Input() totalItems: number = 200;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    changePage(page: number): void {
        if (page >= 1 && this.totalPages) {
            this.currentPage = page;
            this.pageChanged.emit(page);
        }
    }
}