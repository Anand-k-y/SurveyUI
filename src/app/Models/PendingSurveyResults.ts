import { SurveyImports } from "./SurveyImports";

export interface PendingSurveyReults{
    items:SurveyImports[];
    totalItems:number;
    page:number;
    pageSize:number;
    totalPages:number;
}