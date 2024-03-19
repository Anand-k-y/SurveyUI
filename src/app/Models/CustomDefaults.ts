export class CustomDefaults {
    yearIds: any = [];
    monthList: any = [];
  
    constructor() {
        this.monthList = [
            { Value: 1, Text: 'Jan' },
            { Value: 2, Text: 'Feb' },
            { Value: 3, Text: 'Mar' },
            { Value: 4, Text: 'Apr' },
            { Value: 5, Text: 'May' },
            { Value: 6, Text: 'June' },
            { Value: 7, Text: 'July' },
            { Value: 8, Text: 'Aug' },
            { Value: 9, Text: 'Sep' },
            { Value: 10, Text: 'Oct' },
            { Value: 11, Text: 'Nov' },
            { Value: 12, Text: 'Dec' }
        ];
        
        for(var i=new Date().getFullYear();i>=2018;i--){
            this.yearIds.push(i);
        }

    }

    static pageLimitOptions = [ 10 , 20, 30 ,50,100];

   
    
}