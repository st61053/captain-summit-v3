import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { IUserState } from "../types";

// Přidání coinů uživateli
export const addCoins = createAsyncThunk(
    "user/addCoins",
    async (amount: number, { getState, rejectWithValue }) => {
        const state = getState() as { user: IUserState };
        const user = state.user.user;

        if (!user) return rejectWithValue("Uživatel není přihlášen!");

        const newCoins = user.coins + amount;
        const userRef = ref(database, `users/${user.team}/${user.role}/coins`);

        try {
            await set(userRef, newCoins); // Uloží nové množství coinů do Firebase

        } catch (error) {
            return rejectWithValue("Nepodařilo se uložit coiny.");
        }
    }
);