export interface IUserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    listener: (() => void) | null;
}

export interface IUser {
    id: string;
    password: string;
    role: string;
    team: string;
    coins: number;
}