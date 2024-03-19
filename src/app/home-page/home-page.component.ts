import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../Services/api-handler.service';
import { dashboard, dashboardModel, surveyChart, userData } from '../Models/DashboardModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  filteredChartData: any[]=[]; // Data to be displayed after filtering

  selectedYear: number ;
  selectedMonth: string;
  years: number[] = [2021, 2022, 2023,2024]; // Example years
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public surveyChartData: ChartData<'bar'>;
  public surveyChartType: ChartType = 'bar';
index=0;
data:dashboard={
  totalCompletedSurveys: 0,
        totalPendingSurveys: 0,
        surveysToday: 0,
        totalGatewaysInstalled: 0,
        totalGatewaysPending: 0,
        surveyList: [],
        userList:[],
        dailyChart:[],
        yearlyChart:[]
};

displayedColumns: string[] = ['srNo','circle', 'subDivision', 'surveysCompleted', 'surveysPending', 'gatewaysInstalled', 'gatewaysPending', 'surveysToday','totalSurveysBySubDivision'];
userdisplayedColumns: string[] = ['srNo','contractor', 'surveyor', 'surveysCompleted', 'surveysPending', 'gatewaysInstalled', 'gatewaysPending', 'surveysToday','totalSurveysBySubDivision'];
  dataSource = new MatTableDataSource<dashboardModel>();
  UserdataSource = new MatTableDataSource<userData>();
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild("paginator2") paginator2!: MatPaginator;
constructor(private api:ApiHandlerService,private zone: NgZone,private route:Router,private dialog:MatDialog){
  if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null || sessionStorage.getItem("role")!='Administrator'){
    route.navigate(["/login"])
  }
 
  const currentYear = new Date().getFullYear();
  this.selectedYear = currentYear;
  this.selectedMonth = this.monthNames[new Date().getMonth()]; 
  this.years = Array.from({length: currentYear - 1999}, (v, k) => currentYear - k);
  const dialogRef = this.dialog.open(LoadingScreenComponent);
api.GetDashboard().subscribe(result=>{
  debugger
 this.data=result;
 this.dataSource = new MatTableDataSource<dashboardModel>(this.data.surveyList);
 this.UserdataSource = new MatTableDataSource<userData>(this.data.userList);
 this.dataSource.paginator = this.paginator;
 this.UserdataSource.paginator = this.paginator2;
 this.surveyChartData = {
  labels:  this.data.dailyChart.map(s => s.date),
  datasets: [
    { data: this.data.dailyChart.map(s => s.totalSurveys), label: 'Total Surveys' ,backgroundColor:'rgba(129, 106, 235, 0.737)' },
  ]
};
this.filterData();
dialogRef.close();

})

this.surveyChartData = {
  labels:  this.data.dailyChart.map(s => s.date),
  datasets: [
    { data: this.data.dailyChart.map(s => s.totalSurveys), label: 'Total Surveys',backgroundColor:'rgba(129, 106, 235, 0.737)' },
  ]
};

}
filterData() {
  this.filteredChartData = this.data.dailyChart.filter(data => {
   
    const parts = data.date.split('-'); // Assuming date format is 'dd-MM-yyyy'
    const year = parseInt(parts[2], 10);
    const monthIndex = parseInt(parts[1], 10) - 1; // Convert to 0-indexed month
    const monthName = this.monthNames[monthIndex]; // Get the month name
   
    return year ==Number(this.selectedYear) && monthName == (this.selectedMonth);
  });

  const processedData = this.processData(this.filteredChartData);

  this.surveyChartData = {
    labels:  processedData.map(data => data.date),
    datasets: [
      { data: processedData.map(s => s.totalSurveys), label: 'Total Surveys',backgroundColor:'rgba(129, 106, 235, 0.737)' },
    ]
  };
}

processData(apiData:any) {
  // Convert the month name back to its numeric equivalent
  const monthIndex = this.monthNames.indexOf(this.selectedMonth) + 1; // +1 because monthNames are 1-indexed in your setup
  
  // Determine the number of days in the selected month
  const daysInMonth = new Date(this.selectedYear, monthIndex, 0).getDate();
  
  // Generate a list of all dates in the selected month
  const fullMonthData = Array.from({ length: daysInMonth }, (v, k) => {
    const day = k + 1; // Day of the month
    // Format day and month for consistent dd-MM-yyyy format
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
    const dateStr = `${formattedDay}-${formattedMonth}-${this.selectedYear}`;
    const dateSt = `${formattedDay}`;
    // Find data for the current date in the API data, or default to 0 surveys
    const foundData = apiData.find((d:any) => d.date === dateStr);
    return {
      date: dateSt,
      totalSurveys: foundData ? foundData.totalSurveys : 0
    };
  });

  return fullMonthData;
}

}
