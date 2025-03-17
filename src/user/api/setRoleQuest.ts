import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { IRoleQuest } from "../../quest/types";

export const setRoleQuest = createAsyncThunk(
    "user/setRoleQuest",
    async (
        { team, role, roleQuest }: { team: string; role: string; roleQuest: IRoleQuest | null },
        { rejectWithValue }
    ) => {
        // Načteme uživatele z Firebase podle teamu a role
        const userRef = ref(database, `users/${team}/${role}`);

        try {

            if (!roleQuest) {
                return rejectWithValue("RoleQuest nebyl definován.");
            }
            // Načtení aktuálních dat uživatele
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                return rejectWithValue("Uživatel neexistuje!");
            }
            const userData = snapshot.val();

            // Přičteme reward z roleQuest k aktuálním coinům (pokud coins nejsou definovány, použijeme 0)
            const currentCoins = userData.coins || 0;
            const newCoins = currentCoins + roleQuest?.reward;

            // Načteme aktuální pole roleQuestů, nebo pokud neexistuje, vytvoříme prázdné pole
            const currentRoleQuests: string[] = userData.roleQuests || [];

            // Pokud už id roleQuestu v poli není, přidáme jej
            if (!currentRoleQuests.includes(roleQuest.id)) {
                currentRoleQuests.push(roleQuest.id);
            }

            // Hromadná aktualizace: nastavíme nové coin-y a roleQuesty
            await update(userRef, { coins: newCoins, roleQuests: currentRoleQuests });

            return { coins: newCoins, roleQuests: currentRoleQuests };
        } catch (error) {
            return rejectWithValue("Nepodařilo se aktualizovat údaje uživatele.");
        }
    }
);

