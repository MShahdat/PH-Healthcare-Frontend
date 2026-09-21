export interface SidebarItem {
  title: string;
  url: string;
}

export interface SidebarRoute {
  title: string;
  url: string;
  items?: SidebarItem[];
}

export type SidebarRoutes = SidebarRoute[];
