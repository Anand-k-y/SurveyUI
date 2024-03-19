export class Page {
        constructor(){
          this.pageSize = 10;
        }
        // The number of elements in the page
        pageSize: number ;
        // The total number of elements
        totalRecords: number = 0;
        // The total number of pages
        totalPages: number = 0;
        // The current page number
        currentPage: number = 1;
      }
    