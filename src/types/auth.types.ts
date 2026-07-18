export enum UserRole {
  PLAYER = "PLAYER",
  VENUE_ADMIN = "VENUE_ADMIN",
}

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profilePictureUrl: string | null;
  profilePicturePublicId: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type AuthStore = {
  user: AuthUser | null;
  isAuthReady: boolean
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setIsAuthReady: (isAuthReady: boolean) => void
};
