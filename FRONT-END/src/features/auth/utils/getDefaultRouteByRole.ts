export function getDefaultRouteByRole(roles: string[]) {
    if(roles.includes("admin")) return "/admin" ;
    if(roles.includes("client")) return "/client" ;
    if(roles.includes("chef technician")) return "/chef-technician" ;
    if(roles.includes("technician")) return "/technician" ;


    return "/" ;
    
}
