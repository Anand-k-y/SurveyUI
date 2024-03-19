import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { OtpLoginComponent } from './otp-login/otp-login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SurveysComponent } from './surveys/surveys.component';
import { SurveyorAssignmentComponent } from './surveyor-assignment/surveyor-assignment.component';
import { SurveyorFormComponent } from './registration-form/Surveyor/surveyor-form/surveyor-form.component';
import { NetworkPlannerFormComponent } from './registration-form/Network Planner/network-planner-form/network-planner-form.component';
import { AdminFormComponent } from './registration-form/Administrator/admin-form/admin-form.component';
import { ContractorFormComponent } from './registration-form/Contractor/contractor-form/contractor-form.component';
import { SurveyorTableComponent } from './Users/surveyor-table/surveyor-table.component';
import { NetworkPlannerTableComponent } from './Users/network-planner-table/network-planner-table.component';
import { AdminTableComponent } from './Users/admin-table/admin-table.component';
import { ContractorTableComponent } from './Users/contractor-table/contractor-table.component';
import { TreeHierarchyMasterComponent } from './tree-hierarchy-master/tree-hierarchy-master.component';
import { TreeHierarchyLevelComponent } from './tree-hierarchy-level/tree-hierarchy-level.component';
import { TreeHierarchyViewComponent } from './tree-hierarchy-view/tree-hierarchy-view.component';
import { HierarchyUploadComponent } from './hierarchy-upload/hierarchy-upload.component';
import { MainFormComponent } from './main-form/main-form.component';
import { AppDataComponent } from './app-data/app-data.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"image",component:UserDetailsComponent},
  {path:"otplogin",component:OtpLoginComponent},
  {path:"file-upload",component:FileUploadComponent},
  {path:"surveys",component:SurveysComponent},
  {path:"surveyorassignment",component:SurveyorAssignmentComponent},
  {path:"UserEnrollment/Surveyor/Form/:id",component:SurveyorFormComponent},
  {path:"UserEnrollment/NetworkPlanner/Form/:id",component:NetworkPlannerFormComponent},
  {path:"UserEnrollment/Administrator/Form/:id",component:AdminFormComponent},
  {path:"UserEnrollment/Contractor/Form/:id",component:ContractorFormComponent},
  {path:"UserEnrollment/Surveyor",component:SurveyorTableComponent},
  {path:"UserEnrollment/NetworkPlanner",component:NetworkPlannerTableComponent},
  {path:"UserEnrollment/Administrator",component:AdminTableComponent},
  {path:"UserEnrollment/Contractor",component:ContractorTableComponent},
  {path:"hierarchy",component:HierarchyUploadComponent},
  {path:"treeHierarchyMaster",component:TreeHierarchyMasterComponent},
  {path:"treeHierarchyLevel",component:TreeHierarchyLevelComponent},
  {path:"treeHierarchyView",component:TreeHierarchyViewComponent},
  {path:"main-form",component:MainFormComponent},
  {path:"app-data",component:AppDataComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"home",component:HomePageComponent},

  {path:"**",component:SurveysComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
