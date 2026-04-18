import type { User } from "@/features/auth";
import type { status } from "@/modules/chef-technician/components/AssetMap";




export type ReponseMachines = {
    message : string ;
    success : boolean ;

    data : Machine[] ; 
}

export type Machine = {
    id : number ;
    code : string ;
    name : string ;
    location : string ;
    latitude : number ;
    longitude : number ;
    status : status;
    created_by : User ;

}