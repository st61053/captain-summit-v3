import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setUser } from "./user/userSlice";
import { loginUser } from "./user/api/loginUser";
import { ref, onValue, off } from "firebase/database";
import { database } from "./firebase/firebaseConfig";
import { useAppDispatch } from "./app/hooks";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import LoginForm from "./user/components/LoginForm";
import Router from './Router';
import Layout from "./layout/Layout";
import { setQuests } from "./quest/questSlice";

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
        !user
          ? <LoginForm />
          :
          <Layout>
            <Router />
          </Layout>
      }
    </Box>
  );
}

export default App;
