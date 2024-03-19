import { User } from "./User";

export interface PagedResult{
    items:User[];
    totalItems:number;
    page:number;
    pageSize:number;
    totalPages:number;
}