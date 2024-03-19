export class ApiConfig {
    private static apiUrl = "http://220.227.2.200:6677/api/"; // Replace with your actual API URL
  
    static getApiUrl(): string {
      return this.apiUrl;
    }
  }