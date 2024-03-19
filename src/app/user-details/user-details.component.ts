import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiHandlerService } from '../Services/api-handler.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  constructor(private http: HttpClient,private api:ApiHandlerService) { }

}
