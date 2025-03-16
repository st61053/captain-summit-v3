import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { RootState } from "../../app/store";
import { IQuest } from "../types";

export const takeQuest = createAsyncThunk(
    "quest/takeQuest",
    async (questId: string, { getState, rejectWithValue }) => {

        const { user, quest } = getState() as RootState;

        const questRef = ref(database, `quests/${quest.quests.findIndex((quest: IQuest) => quest.id === questId)}/status`);

        try {
            await set(questRef, user.user?.team); // Uloží nové množství coinů do Firebase

        } catch (error) {
            return rejectWithValue("Nepodařilo se uložit stav.");
        }
    }
);