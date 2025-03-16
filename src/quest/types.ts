import { IconEnum } from "../assets/icons";

export interface IQuestState {
    quests: IQuest[];
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
}

export interface ICords {
    lat: number;
    lng: number;
}