

export type TechniciansResponse = {
    message : string ;
    success : boolean ;
    data : Technician[] ; 
}

export type Technician = {
    id : number ;
    first_name : string ;
    last_name : string ;
    email : string ;
    phone : string ;
    
}
