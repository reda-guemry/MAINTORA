

export function getDefaultRouteByRole(roles: string[]) {
    if(roles.includes("admin")) return "/admin" ;
    if(roles.includes("client")) return "/client" ;

    return "/" ;
    
}