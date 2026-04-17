import type { User } from "../types/auth.type";


export function getDefaultRouteByRole(roles: User["roles"][number]["name"][]) {
    if(roles.includes("admin")) return "/admin" ;
    if(roles.includes("client")) return "/client" ;
    if(roles.includes("chef-technician")) return "/chef-technician" ;


    return "/" ;
    
}