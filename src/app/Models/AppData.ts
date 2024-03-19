import { AreaType } from "./AreaType";
import { InstallationType } from "./InstallationType";
import { Obstacles } from "./Obstacles";

export interface AppData{
    areaTypes:AreaType[]
    installationTypes:InstallationType[]
    obstacles:Obstacles[]
}