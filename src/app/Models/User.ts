export interface User{
    id: number
    isActive:number;
    isDeleted:number;
    creationDate:string;
    modificationDate:string;
    loggedStatus:number;
    lastLoginTime:string;
    name: string
    email: string
    password: string
    mobileNo: string
    address: string
    role: string
    contractor: number
    agencyName: string
    contactPerson: string
    areaAssigned: string
    deviceId:string
    otpByPass:number
    isBridgeUser:number
    isSurveyUser:number
    bridgeRole:string
}