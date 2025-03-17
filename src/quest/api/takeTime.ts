import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { RootState } from "../../app/store";
import { database } from "../../firebase/firebaseConfig";
import { IQuest } from "../types";

import dayjs from 'dayjs';

export const takeTime = createAsyncThunk(
    "quest/takeTime",
    async (questId: string, { getState, rejectWithValue }) => {

        const { quest } = getState() as RootState;

        const questRef = ref(database, `quests/${quest.quests.findIndex((quest: IQuest) => quest.id === questId)}/takeTime`);

        const futureTime = dayjs().add(5, 'minute').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');

        try {
            await set(questRef, futureTime); // Uloží nové množství coinů do Firebase

        } catch (error) {
            return rejectWithValue("Nepodařilo se uložit stav.");
        }
    }
);
