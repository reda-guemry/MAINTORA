import type { User } from "@/features/auth";




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
    status : string ;
    created_by : User ;

}