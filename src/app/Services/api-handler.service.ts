import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from '../Models/result';
import { PagedResult } from '../Models/PagedResult';
import { User } from '../Models/User';
import { ApiConfig } from 'src/assets/api.config';
import { SurveyResult } from '../Models/SurveyResult';
import axios, { AxiosPromise } from 'axios';
import { SurveyImports } from '../Models/SurveyImports';
import { PendingSurveyReults } from '../Models/PendingSurveyResults';
import { AppData } from '../Models/AppData';
import { AreaType } from '../Models/AreaType';
import { InstallationType } from '../Models/InstallationType';
import { Obstacles } from '../Models/Obstacles';
import { AppVersion } from '../Models/AppVersion';
import { dashboard } from '../Models/DashboardModel';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
url:string="";
  constructor(private http:HttpClient) 
  {
    this.url = ApiConfig.getApiUrl();
   }
  //  apiUrl = "http://220/api/";
   isCollapsed = false;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
  getUsers(page: number, pageSize: number): Observable<PagedResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    })
   
    return this.http.get<PagedResult>(this.url+"Registration/getusers?page="+page+"&pageSize="+pageSize,{headers});
}
getAllUsers(): Observable<User[]> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
 
  return this.http.get<User[]>(this.url+"Registration/getallusers",{headers});
}
  ValidateLogin(data:any):Observable<Result>{
    debugger
    return this.http.post<Result>(this.url+"Registration/login",data);
  }

  RegisterUser(data:any,isSUser:number,isBUser:number,bRole:string):Observable<any>{
debugger
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    })
    const dd = {
      data:data,
      isSurveyUser:isSUser,
      isBridgeUser:isBUser,
      bridgeRole:bRole
    }
    return this.http.post<any>(this.url+"Registration/adduser",dd,{headers});
  }
 GetUserById(id:number):Observable<User>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  return this.http.get<User>(this.url+"Registration/getuserbyid?id="+id,{headers});
 }

 UpdateUser(data:any):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.put<any>(this.url+"Registration/updateuser",data,{headers});
 }

 DeleteUser(id:any):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.delete<any>(this.url+"Registration/deletebyid?id="+id,{headers});
 }

GetAllUsers(role:string):Observable<User[]>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  return this.http.get<User[]>(this.url+"User/getallusers?role="+role,{headers});

}

SendOTP(email:any):Observable<Result>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.post<Result>(this.url+"User/login?email="+email,{headers});

}
GetOTP(email:any):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.post<number>(this.url+"User/sendOtp?email="+email,{headers});

}

ExcelUpload(formdata:FormData):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  console.log(sessionStorage.getItem("token"));
  return this.http.post<any>(this.url+"Survey/exportsurveys",formdata,{headers});
}


GetContractors():Observable<User[]>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  return this.http.get<User[]>(this.url+"User/getcontractors",{headers});

}
GetAllSurveys(page: number, pageSize: number,circle:string,subDivision:string,surveyorId:number,selectedType:string): Observable<SurveyResult> {
  debugger
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  if(circle=="" && subDivision==""){
    circle="All";
    subDivision="All";
  }
  if(circle!="" && subDivision==""){
    subDivision="All"
  }
  const encodedSubDivision = encodeURIComponent(subDivision);
  const apiUrl1 = `${this.url}Survey/getsurveys?page=${page}&pageSize=${pageSize}&circle=${circle}&subDivision=${encodedSubDivision}&surveyorId=${surveyorId}&selectedType=${selectedType}`;
  
  return this.http.get<SurveyResult>(apiUrl1,{headers});
}

GetSurveys(circle:string ,subDivision:string,surveyorId:number): Observable<SurveyResult> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  debugger
  if(circle=="" && subDivision==""){
    circle="All";
    subDivision="All";
  }
  if(subDivision==""){
    subDivision="All"
  }
  const encodedSubDivision = encodeURIComponent(subDivision);
  const encodedcircle = encodeURIComponent(circle);
  const apiUrl1 = `${this.url}Survey/getAllsurveys?circle=${encodedcircle}&subDivision=${encodedSubDivision}&surveyorId=${surveyorId}`;
  
  return this.http.get<SurveyResult>(apiUrl1,{headers});
}

GetSurveyImages(id:number,n:number):Observable<Blob>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
    
  })
 
  return this.http.get(this.url+"Survey/getsurveyimage?id="+id+"&imageNumber="+n,{responseType:'blob',headers:headers});
}

UploadHierarchy(formData:FormData):Observable<any>{

  return this.http.post("https://localhost:44305/AddHierarchyNode",formData);

}

uploadTreeHierarchy(obj: any, files: any): Observable<any> {
  const formData = new FormData();
  formData.append("model", JSON.stringify(obj));

    formData.append("file" , files);
  

  return this.http.post("https://localhost:44325/api/Hierarchy/UploadTreeHierarchy",formData);
}

GetPendingSurveys(page: number, pageSize: number,to:number,circle:string,subDivision:string): Observable<PendingSurveyReults> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  if(subDivision==""){
    subDivision="All";
 }
  if(circle==""){
     circle="All";
     subDivision="All";
  }

  const encodedSubDivision = encodeURIComponent(subDivision);
  return this.http.get<PendingSurveyReults>(this.url+"Survey/getAllPendingSurveys?page="+page+"&pageSize="+pageSize+"&to="+to+"&circle="+circle+"&subDivision="+encodedSubDivision,{headers});

}
GetUnassignedSurveys(page: number, pageSize: number,circle:string,subDivision:string): Observable<PendingSurveyReults> {
 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  if(subDivision==""){
    subDivision="All";
 }
  if(circle==""){
     circle="All";
     subDivision="All";
  }

  const encodedSubDivision = encodeURIComponent(subDivision);
  const apiUrl1 = `${this.url}Survey/getUnassignedSurveys?page=${page}&pageSize=${pageSize}&circle=${circle}&subDivision=${encodedSubDivision}`;
  
  return this.http.get<PendingSurveyReults>(apiUrl1, { headers });
  
}

submitSelectedIds(selectedIds: number[],UserId:number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  const data={selectedIds,UserId};
  return this.http.post(this.url+"Survey/submitselectedids", data ,{headers} );
}

GetSurveyors():Observable<User[]>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  return this.http.get<User[]>(this.url+"User/getSurveyorsByContractor",{headers});

}

GetAllSubDivisions(circle:string):Observable<string[]>{
  debugger
  if(circle=="" || circle=="NA"){
    circle="All";
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  return this.http.get<string[]>(this.url+"Survey/getSubDivisions?circle="+circle,{headers});

}
GetAllCircles():Observable<string[]>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  return this.http.get<string[]>(this.url+"Survey/GetAllCircles",{headers});

}
GetTypes():Observable<AppData>{
  return this.http.get<AppData>(this.url+"Form/getalltypes")
}

UpdateAreaType(areaType:AreaType):Observable<number>{
  debugger
  return this.http.put<number>(this.url+"Form/editareatype",areaType)
}
UpdateInstallationType(type:InstallationType):Observable<number>{
  return this.http.put<number>(this.url+"Form/editinstallationtype",type)
}
UpdateObstacles(type:Obstacles):Observable<number>{
  return this.http.put<number>(this.url+"Form/editobstacle",type)
}
DeleteAreaType(areaType:AreaType):Observable<number>{
  return this.http.post<number>(this.url+"Form/deleteareatype",areaType)
}
DeleteInstallationType(type:InstallationType):Observable<number>{
  return this.http.post<number>(this.url+"Form/deleteinstallationtype",type)
}
DeleteObstacles(type:Obstacles):Observable<number>{
  return this.http.post<number>(this.url+"Form/deleteobstacle",type)
}
AddAreaType(areaType:AreaType):Observable<number>{
  debugger
  return this.http.post<number>(this.url+"Form/addareatype",areaType)
}
AddInstallationType(type:InstallationType):Observable<number>{
  return this.http.post<number>(this.url+"Form/addinstallationtype",type)
}
AddObstacles(type:Obstacles):Observable<number>{
  return this.http.post<number>(this.url+"Form/addobstacle",type)
}


TransferSurvey(suvreyId: number, toId: number): Observable<number> {
  debugger
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
 
  return this.http.get<number>(this.url+"Survey/transfersurvey?surveyId="+suvreyId+"&to="+toId,{headers});

}

DeleteSurveys(selectedIds: number[],UserId:number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  const data={selectedIds,UserId};
  return this.http.post(this.url+"Survey/deletesurveys", data ,{headers});
}
TransferSurveys(selectedIds: number[],UserId:number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  const data={selectedIds,UserId};
  return this.http.post(this.url+"Survey/transfersurveys", data ,{headers});
}

UpdateVersion(version:AppVersion):Observable<number>{
  return this.http.post<number>(this.url+"Form/updateAppVersion",version)
}
GetVersion():Observable<string>{
 
  return this.http.get(this.url+"User/getappversion",{ responseType: 'text' })
}
SetVersion(version:string):Observable<string>{
  return this.http.get<string>(this.url+"User/setappversion?version="+version)
}

GetDashboard():Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })
  return this.http.get<any>(this.url+"Survey/getdashboarddata",{headers})
}
}