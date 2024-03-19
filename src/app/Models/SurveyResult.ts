import { Survey } from "./Surveys";


export interface SurveyResult{
    items:Survey[];
    totalItems:number;
    page:number;
    pageSize:number;
    totalPages:number;
}