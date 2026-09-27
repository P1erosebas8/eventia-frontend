export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  events: number;
  liveLabel: string;
  volume: string;
  isActive: boolean;
}

export interface NewAdminCategory {
  name: string;
}
