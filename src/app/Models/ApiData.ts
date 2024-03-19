import { Actions } from "./Actions";
import { GroupTable } from "./GroupTable";
import { HeadingData } from "./HeadingData";
import { HierarchyData } from "./HierarchyData";
import { Option } from "./Option";
import { Rowset } from "./Rowset";

export interface ApiData{
    Id: any;
    api: any;
    // HierarchyGridData: any;
    // NoOfLevel:number
    // Id:number
    // HierarchyName:string
    // body:string
    // hierarchyData:HierarchyData[],
    headingData:HeadingData[]
    options:Option
    numberOfColumn:string
    isGrouping:boolean
    isShowSrNo:boolean
    isEnableTranslation:boolean
    isTransformModelForGrouping:boolean
    linkColumnName:string
    linkColumnName1:string
    hoverColumn:string
    linkCalculationColumn:string
    expandGroupingRows:boolean
    Actions:Actions[]
    rowData:Rowset[]
    tableData:GroupTable[]
    showCheckbox:boolean
    serverPagination:boolean
    showPaginationRow:boolean
totalData:number
    }