import { Injectable } from '@angular/core';
import { Page } from "../Models/Page";
import { HttpClient }    from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiengineService {
  constructor( private http: HttpClient ) { }

  GetAiEngineGridData():Observable<any>{
    
    return this.http.get('http://localhost:8888/api/Hierarchy/GetTreeHierarchy');

    
    // return this.http.delete('https://localhost:7090/api/Api/DeleteData?id=54'); 
}
}
