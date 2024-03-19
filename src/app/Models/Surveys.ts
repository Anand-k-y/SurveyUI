export interface Survey{
    id                     :number
    surveyId                 :number;
    userId:number;
    userName:string;
    submissionDate:string;
    networkProviderSim1       :string;
    networkProviderSim2      :string;
    rssiSim1                 :string;
    rssiSim2                 :string;
    rfNoise                   :string;
    nearestLandmark         : string;
    latitude                  : Float32Array ;
    longitude                : Float32Array ;
    altitude                 :Float32Array;
    areaType                :string;
    installationType        :string;
    installationIdentifier : string;
    orientation              :string;
    obstacles               :string;
    channel_Dbm                 :string;
    imageCount :number;

    image1:string;
    image2:string;
    image3:string;
    image4:string
    image5:string;
    supplyInput:string;
    changedLocation:string;
        deviceId:string;
        plannedLatitude                  : Float32Array ;
        plannedLongitude                : Float32Array ;
        plannedAltitude                 :Float32Array;
        remarks :string;
        jsonData:string;
}