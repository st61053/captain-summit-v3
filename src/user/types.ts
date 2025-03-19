import { ICords } from "../quest/types";

export interface IUserState {
    users: IUser[];
    user: IUser | null;
    loading: boolean;
    error: string | null;
    listener: (() => void) | null;
    message: IMessage;
}

export interface IUser {
    id: string;
    password: string;
    role: string;
    team: string;
    coins: number;
    location: ICords;
    roleQuests: string[];
}

export interface IMessage {
    title: string;
    message: string;
    active: boolean;
}