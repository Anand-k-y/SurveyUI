import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiData } from '../Models/ApiData';
import { HierarchyGridData } from '../Models/HierarchyGridData';
@Injectable({
  providedIn: 'root',
})
export class HierarchyServiceService {
  HierarchyName: string | undefined;
  apiUrl = "http://192.10.10.230:6676/api/";
  Hierarchy: any;
  setSelectedHierarchyName(name: string) {
    this.HierarchyName = name;
  }

  getSelectedHierarchyName() {
    return this.HierarchyName;
  }


  setSelectedHierarchyLevel(Hierarchy: string) {

    this.Hierarchy = Hierarchy;
  }

  getSelectedHierarchyLevel() {
    return this.Hierarchy;
  }
  constructor(private http: HttpClient) { }

  getAllHierarchy(searchparam: any): Observable<any> {
    const formData = new FormData();
    formData.append('model', JSON.stringify(searchparam));
    return this.http.post<any>('api/Hierarchy/GetAllHierarchys', formData);
  }

  getTreeHierarchy(searchparam: any): Observable<HierarchyGridData> {
    debugger
    const formData = new FormData();
    formData.append('model', JSON.stringify(searchparam));
    return this.http.post<HierarchyGridData>(
      this.apiUrl+'Hierarchy/GetTreeHierarchy',
      formData
    );
  }
  getTreeHierarchyByName(name: string): Observable<any> {
    const url = this.apiUrl+`Hierarchy/GetTreeHierarchyByName?name=${name}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(url, { headers });
  }
  HierarchyManagement(path: string): Observable<any> {
    return this.http.post<any>(`api/BackgroundJobs/${path}`, null);
  }

  DeleteHierarchyNode(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('model', JSON.stringify(obj));
    return this.http.post<any>(
      this.apiUrl+'Hierarchy/DeleteHierarchyNode',
      formData
    );
  }
  AddHierarchyMaster(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('model', JSON.stringify(obj));

    return this.http.post<any>(
      this.apiUrl+'Hierarchy/AddHierarchyMaster',
      formData
    );
  }

  EditHierarchyNode(obj: any): Observable<any> {
    const formData = new FormData();
    formData.append('model', JSON.stringify(obj));
    return this.http.post<any>(
      this.apiUrl+'Hierarchy/EditHierarchyNode',
      formData
    );
  }

  AddHierarchyNode(
    obj: any,
    // id: any,
    name: any,
    // ParentId: any
  ): Observable<any> {
    const formData = new FormData();
    debugger;
    obj.HierarchyName = name;
    // obj.HierarchyId = id;
    // obj.ParentId = ParentId;
    formData.append('model', JSON.stringify(obj));
    return this.http.post<any>(
      this.apiUrl+'Hierarchy/AddHierarchyNode',
      formData
    );
  }

  uploadTreeHierarchy(formData: FormData): Observable<any> {
    // const formData = new FormData();
    // debugger
    // formData.append('model', JSON.stringify(obj));

    //   formData.append('file' + 0, files);
    debugger;
    return this.http.post<any>(
      this.apiUrl+'Hierarchy/UploadTreeHierarchy',
      formData
    );
  }
  downloadSampleFileForHierarchy(obj: any): Observable<Blob> {
    const formData = new FormData();
    formData.append('model', JSON.stringify(obj));

    return this.http.get<any>(
      this.apiUrl+'Hierarchy/DownloadSampleForHierarchy?name=' +
      obj,
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
