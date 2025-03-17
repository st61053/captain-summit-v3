import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "./types";
import { loginUser } from "./api/loginUser";

const initialState: IUserState = {
    users: [],
    user: JSON.parse(localStorage.getItem("user") ?? "null"),
    loading: false,
    error: "",
    listener: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        logout: (state) => {
            state.user = null;
            sessionStorage.removeItem('refreshed');
            localStorage.removeItem("userPassword");
            localStorage.removeItem("admin");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});


export const {
    setUser,
    logout,
    setUsers
} = userSlice.actions;

export default userSlice.reducer;
