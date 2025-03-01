
export type UserRole = "super_admin" | "admin" | "teacher" | "staff";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolCode?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  allowedRoles: UserRole[];
}
