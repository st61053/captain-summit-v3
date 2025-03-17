import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { IUserState } from "../types";

export const setTeamCoins = createAsyncThunk(
    "user/setTeamCoins",
    async (
        { team, coins }: { team: string; coins: number },
        { getState, rejectWithValue }
    ) => {
        // Získáme aktuálně přihlášeného uživatele
        const state = getState() as { user: IUserState };
        const user = state.user.user;
        if (!user) return rejectWithValue("Uživatel není přihlášen!");

        // Získáme referenci na celý tým
        const teamRef = ref(database, `users/${team}`);

        try {
            // Nejprve načteme všechny uživatele v daném týmu
            const snapshot = await get(teamRef);
            if (!snapshot.exists()) {
                return rejectWithValue("Tým neexistuje!");
            }
            const teamUsers = snapshot.val();

            // Vytvoříme update objekt, kde pro každou roli nastavíme novou hodnotu coinů
            const updates: { [key: string]: any } = {};
            Object.keys(teamUsers).forEach((role) => {
                const userData = teamUsers[role];
                // Přičteme coins k aktuálním coinům, předpokládáme, že pokud coins není definováno, pak je 0
                const newCoins = (userData.coins || 0) + coins;
                updates[`${role}/coins`] = newCoins;
            });

            // Provedeme hromadnou aktualizaci všech uživatelů v týmu
            await update(teamRef, updates);

            // Můžeš vrátit třeba aktualizovaná data nebo zprávu o úspěchu
            return { team, updates };
        } catch (error) {
            return rejectWithValue("Nepodařilo se aktualizovat coins pro tým.");
        }
    }
);