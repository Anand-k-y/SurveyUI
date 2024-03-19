import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
 username:string|null;
 role:string|null;

constructor(private route:Router) {
  this.username = sessionStorage.getItem('username')||'';
  this.role=sessionStorage.getItem('role')||'';
 
}
ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  NavbarComponent
}

isSideMenuOpen = false;

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }
 logout(){
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
  this.route.navigate(["/login"]);
 }
 getCurrentYear(): number {
  return new Date().getFullYear();
}
 
OpenAccount(){
  
}
}
