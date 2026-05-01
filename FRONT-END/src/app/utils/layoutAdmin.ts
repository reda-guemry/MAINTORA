
const adminBreadcrumbRoutes = [
  { pattern: /^\/admin\/?$/, label: "Dashboard" },
  { pattern: /^\/admin\/users\/?$/, label: "Users" },
  { pattern: /^\/admin\/machines\/?$/, label: "Machines" },
  { pattern: /^\/admin\/profile\/?$/, label: "Profile" },
  { pattern: /^\/admin\/reports\/?$/, label: "Reports" },
  { pattern: /^\/admin\/settings\/?$/, label: "Settings" },
  {
    pattern: /^\/admin\/machines\/[^/]+\/history\/?$/,
    label: "Machine History",
  },
];

export function getAdminBreadcrumbLabel(pathname: string) {
  return (
    adminBreadcrumbRoutes.find((route) => route.pattern.test(pathname))
      ?.label ?? "Admin"
  );
}
