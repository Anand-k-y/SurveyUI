import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { ApiConfig } from 'src/assets/api.config';
import { OtpLoginComponent } from './otp-login/otp-login.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SurveysComponent } from './surveys/surveys.component';
import { ChannelDbmPopupComponent } from './channel-dbm-popup/channel-dbm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageViewPopupComponent } from './image-view-popup/image-view-popup.component';
import { MatTableModule } from '@angular/material/table';
import { SurveyorAssignmentComponent } from './surveyor-assignment/surveyor-assignment.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HierarchyUploadComponent } from './hierarchy-upload/hierarchy-upload.component';
import { TreeHierarchyMasterComponent } from './tree-hierarchy-master/tree-hierarchy-master.component';
import { MapTypePipe } from './map-type.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { MatInputModule } from '@angular/material/input';
import { DoubleClickEditDirective } from './double-click-edit.directive';
import { TreeHierarchyLevelComponent } from './tree-hierarchy-level/tree-hierarchy-level.component';
import { TreeHierarchyViewComponent } from './tree-hierarchy-view/tree-hierarchy-view.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddNodeDialogComponent } from './add-node-dialog/add-node-dialog.component';
import { MatTreeModule } from '@angular/material/tree';
import { PasswordChangeComponent } from './password-update/password-change/password-change.component';
import { PasswordPopupComponent } from './password-update/password-popup/password-popup.component';
import { DateFormatPipe } from './Pipes/DateFormatPipe';
import { AdminTableComponent } from './Users/admin-table/admin-table.component';
import { ContractorTableComponent } from './Users/contractor-table/contractor-table.component';
import { NetworkPlannerTableComponent } from './Users/network-planner-table/network-planner-table.component';
import { SurveyorTableComponent } from './Users/surveyor-table/surveyor-table.component';
import { AdminFormComponent } from './registration-form/Administrator/admin-form/admin-form.component';
import { ContractorFormComponent } from './registration-form/Contractor/contractor-form/contractor-form.component';
import { NetworkPlannerFormComponent } from './registration-form/Network Planner/network-planner-form/network-planner-form.component';
import { SurveyorFormComponent } from './registration-form/Surveyor/surveyor-form/surveyor-form.component';
import { MainFormComponent } from './main-form/main-form.component';
import { AppDataComponent } from './app-data/app-data.component';
import { AppPopUpComponent } from './app-pop-up/app-pop-up.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { TransferPopupComponent } from './transfer-popup/transfer-popup.component';
import { AlertpopupComponent } from './alertpopup/alertpopup.component';
import { LatLongPopupComponent } from './lat-long-popup/lat-long-popup.component';
import { GateWayPopupComponent } from './gate-way-popup/gate-way-popup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    OtpLoginComponent,
    LoadingScreenComponent,
    FileUploadComponent,
    SurveysComponent,
    ChannelDbmPopupComponent,
    ImageViewPopupComponent,
    SurveyorAssignmentComponent,
    HierarchyUploadComponent,
    TreeHierarchyMasterComponent,
    MapTypePipe,
    DoubleClickEditDirective,
    TreeHierarchyLevelComponent,
    TreeHierarchyViewComponent,
    AddNodeDialogComponent,
    PasswordChangeComponent,
    PasswordPopupComponent,
    AdminFormComponent,
    ContractorFormComponent,
    NetworkPlannerFormComponent,
    SurveyorFormComponent,
    AdminTableComponent,
    ContractorTableComponent,
    SurveyorTableComponent,
    NetworkPlannerTableComponent,
    DateFormatPipe,
    MainFormComponent,
    AppDataComponent,
    AppPopUpComponent,
    SuccessPopupComponent,
    TransferPopupComponent,
    AlertpopupComponent,
    LatLongPopupComponent,
    GateWayPopupComponent,
    HomePageComponent

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterModule.forRoot([]),
    MatDialogModule,
    MatButtonModule,
   MatTableModule,
    HttpClientModule,
    NgxDatatableModule,
    AgGridModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTreeModule,
    MatPaginatorModule,
    NgChartsModule
  ],
  providers: [ApiConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
