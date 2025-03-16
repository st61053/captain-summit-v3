import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuest, IQuestState } from "./types";

const initialState: IQuestState = {
    quests: [],
    loading: false,
    error: "",
};

const questSlice = createSlice({
    name: "quest",
    initialState,
    reducers: {
        setQuests: (state, action: PayloadAction<IQuest[]>) => {
            state.quests = action.payload;
        }
    },
    selectors: {
        getQuests: (state) => state.quests,
    }
});

export const {
    setQuests,
} = questSlice.actions;

export const {
    getQuests,
} = questSlice.selectors;

export default questSlice.reducer;
