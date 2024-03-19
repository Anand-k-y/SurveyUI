import { ApiData } from "./ApiData";

export interface HierarchyData {
    hierarchyData: ApiData; // Change the type to the actual data type of your rowData
    totalRecords: number;
    pageSize: number;
    // isClientSidePagination: boolean;
    sortColumnName: string;
    currentPage: number;
  }