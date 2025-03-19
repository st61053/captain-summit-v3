import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setMessage, setUser, setUsers } from "./user/userSlice";
import { loginUser } from "./user/api/loginUser";
import { ref, onValue, off } from "firebase/database";
import { database } from "./firebase/firebaseConfig";
import { useAppDispatch } from "./app/hooks";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import LoginForm from "./user/components/LoginForm";
import Router from './Router';
import Layout from "./layout/Layout";
import { setQuests, setRoleQuests } from "./quest/questSlice";
import { IUser } from "./user/types";
import AdminDashboard from "./layout/AdminDashboard";
import { IRoleQuest } from "./quest/types";
import { setEndOfGame } from "./layout/layoutSlice";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);

  // Lokální stav pro login
  const [password,] = useState(localStorage.getItem("userPassword") ?? null);
  const [role,] = useState(localStorage.getItem("userRole") ?? null);

  // Uchovává předchozí stav uživatele (abychom zabránili nekonečnému updatu)
  const prevUserRef = useRef(user);

  // Automatické přihlášení při načtení aplikace, pokud je heslo v localStorage
  useEffect(() => {
    if (password && role) {
      setLoading(true);
      dispatch(loginUser({ password, role })).then(() => setLoading(false));
    }
  }, [dispatch]);


  useEffect(() => {
    if (!user) return;

    if (user.id !== "admin") {
      const userQuery = ref(database, `users/${user.team}/${user.role}`);

      onValue(userQuery, (snapshot) => {
        if (snapshot.exists()) {
          const updatedUser = snapshot.val();

          // Ověříme, jestli se data skutečně změnila
          if (JSON.stringify(updatedUser) !== JSON.stringify(prevUserRef.current)) {
            dispatch(setUser(updatedUser));
            prevUserRef.current = updatedUser; // Aktualizujeme referenci
          }
        }
      });

      return () => {
        off(userQuery);
      };
    }
  }, [dispatch, user]);

  useEffect(() => {
    const questsQuery = ref(database, `quests`);

    onValue(questsQuery, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setQuests(snapshot.val()));
      }
    });

    return () => {
      off(questsQuery);
    };
  }, [dispatch]);

  useEffect(() => {
    const usersQuery = ref(database, `users`);

    onValue(usersQuery, (snapshot) => {
      if (snapshot.exists()) {

        const users = Object.values(snapshot.val()).flatMap((team: any) => Object.values(team));
        dispatch(setUsers(users as IUser[]));
      }
    });

    return () => {
      off(usersQuery);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    if (user.id !== "admin") {
      const roleQuestsQuery = ref(database, `roleQuests/${user?.role}`);

      onValue(roleQuestsQuery, (snapshot) => {
        dispatch(setRoleQuests(snapshot.val()))
      });
      return () => {
        off(roleQuestsQuery);
      };
    } else {
      const roleQuestsQuery = ref(database, `roleQuests`);

      onValue(roleQuestsQuery, (snapshot) => {
        const data = snapshot.val();
        if (!data) return; // Ošetření, kdy není žádná data

        const questsArray = Object.keys(data).reduce<IRoleQuest[]>((acc, roleKey) => {
          const quests = data[roleKey];
          const roleQuests: IRoleQuest[] = Object.keys(quests).map((questKey): IRoleQuest => {
            const quest = quests[questKey];
            // Pokud quest nemá vlastnost "role", přidáme ji
            if (!quest.role) {
              quest.role = roleKey;
            }
            return quest as IRoleQuest;
          });
          return acc.concat(roleQuests);
        }, []);

        dispatch(setRoleQuests(questsArray));
      });
      return () => {
        off(roleQuestsQuery);
      };
    }
  }, [dispatch, user]);


  useEffect(() => {
    const settingsMessageQuery = ref(database, `settings/message`);

    onValue(settingsMessageQuery, (snapshot) => {
      if (snapshot.exists()) {
        const message = snapshot.val();
        dispatch(setMessage(message));
      }
    });

    return () => {
      off(settingsMessageQuery);
    };
  }, [dispatch]);

  useEffect(() => {
    const settingsGameEndTimeQuery = ref(database, `settings/gameEndTime`);

    onValue(settingsGameEndTimeQuery, (snapshot) => {
      if (snapshot.exists()) {
        const gameEndTime = snapshot.val();
        dispatch(setEndOfGame(gameEndTime));
      }
    });

    return () => {
      off(settingsGameEndTimeQuery);
    };
  }, [dispatch]);



  if (loading) {
    return <Backdrop
      open={true}
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  }


  return (
    <Box sx={{
      width: "100%",
      height: "100vh",
    }}>
      {
        !user ? <LoginForm />
          :
          <Layout>
            {user.id === "admin" ? <AdminDashboard /> : <Router />}
          </Layout>
      }
    </Box>
  );
}

export default App;
