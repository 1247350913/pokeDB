export interface UserDTO { id: number; email: string; }
export type TokenResponse = { token: string; user: { id: number; email: string } };
