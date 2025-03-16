import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import { IUser } from "../types";
import { database } from "../../firebase/firebaseConfig";

// Přihlášení uživatele
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ password, role }: { password: string; role: string }, { dispatch, rejectWithValue }) => {
        const [team, pass] = password.split("-"); // Rozdělení na tým a heslo

        try {
            const snapshot = await get(ref(database, `users/${team}/${role}`));

            if (!snapshot.exists()) {
                throw new Error("Neplatný tým nebo role.");
            }

            const userData: IUser = snapshot.val();
            if (userData.password !== pass) {
                throw new Error("Nesprávné heslo.");
            }

            const user: IUser = userData;

            // 🔹 Uložení pouze hesla do localStorage
            localStorage.setItem("userPassword", password);
            localStorage.setItem("userRole", role);

            return user;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
