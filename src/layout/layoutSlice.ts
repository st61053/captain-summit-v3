import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ILayoutSlice {
    gameEndTime: string;
}

const initialState: ILayoutSlice = {
    gameEndTime: "",
};

const layoutSlice = createSlice({
    name: "quest",
    initialState,
    reducers: {
        setEndOfGame: (state, action: PayloadAction<string>) => {
            state.gameEndTime = action.payload;
        },
    }
});

export const {
    setEndOfGame
} = layoutSlice.actions;


export default layoutSlice.reducer;
