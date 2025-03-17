import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { IUserState } from "../types";
import { ICords } from "../../quest/types";

// Přidání coinů uživateli
export const setLocation = createAsyncThunk(
    "user/setLocation",
    async (location: ICords, { getState, rejectWithValue }) => {
        const state = getState() as { user: IUserState };
        const user = state.user.user;

        if (!user) return rejectWithValue("Uživatel není přihlášen!");

        const userRef = ref(database, `users/${user.team}/${user.role}/location`);

        try {
            await set(userRef, location); // Uloží nové množství coinů do Firebase

        } catch (error) {
            return rejectWithValue("Nepodařilo se uložit lokaci uživatele.");
        }
    }
);