import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuest, IQuestState, IRoleQuest } from "./types";

const initialState: IQuestState = {
    quests: [],
    roleQuests: [],
    loading: false,
    error: "",
};

const questSlice = createSlice({
    name: "quest",
    initialState,
    reducers: {
        setQuests: (state, action: PayloadAction<IQuest[]>) => {
            state.quests = action.payload;
        },
        setRoleQuests: (state, action: PayloadAction<IRoleQuest[]>) => {
            state.roleQuests = action.payload;
        }
    },
    selectors: {
        getQuests: (state) => state.quests,
    }
});

export const {
    setQuests,
    setRoleQuests,
} = questSlice.actions;

export const {
    getQuests,
} = questSlice.selectors;

export default questSlice.reducer;
