export interface dashboard{
    totalCompletedSurveys:number;
    totalPendingSurveys:number;
    surveysToday:number;
    totalGatewaysInstalled:number;
    totalGatewaysPending:number;
    surveyList:dashboardModel[];
    userList:userData[];
    dailyChart :surveyChart[];
    yearlyChart:surveyChart[];
}

export interface dashboardModel{
    circle:string;
    subDivision:string;
    surveysCompleted:number;
    surveysPending:number;
    totalSurveysBySubDivision:number;
    gatewaysInstalled:number;
    gatewaysPending:number; 
    surveysToday:string;
}
export interface userData{
    contractor:string;
    surveyor:string;
    surveysCompleted:number;
    surveysPending:number;
    totalSurveysBySubDivision:number;
    gatewaysInstalled:number;
    gatewaysPending:number; 
    surveysToday:string;
}
export interface surveyChart{
    totalSurveys:number;
    date:string;
}