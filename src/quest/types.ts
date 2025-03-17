import { IconEnum } from "../assets/icons";

export interface IQuestState {
    quests: IQuest[];
    roleQuests: IRoleQuest[];
    loading: boolean;
    error: string;
}

export interface IQuest {
    id: string;
    title: string;
    description: string;
    locDesc: string;
    reward: number;
    status: string;
    location: ICords;
    icon: IconEnum;
    takeTime: string;
    roleQuests: string[];
}

export interface ICords {
    lat: number;
    lng: number;
}

export interface IRoleQuest {
    id: string;
    title: string;
    description: string;
    reward: number;
    role: string;
}