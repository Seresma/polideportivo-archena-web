
export interface AuthResponse {
  token?: string;
  message?: string;
  rol?: string;
  username?: string;
  email?: string;
  id?: number;
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  rol: string;
}

export interface ReservationResponse {
  id?: number;
  name?: string;
  sport?: string;
  track?: string;
  startDate?: Date;
  endDate?: Date;
  day?: Date;
  state?: string;
  cost?: number;
  createdDate?: Date;
}

