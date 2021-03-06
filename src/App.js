import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";
import Favorites from "./components/Favorites/Favorites";
import firebase from "firebase";
import fb from "./firebase/firebase.utils";

const auth = fb.auth;
const firestore = fb.firestore;

export const Context = createContext();
const baseUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [queryData, setQueryData] = useState();
  const [hasSession, setSession] = useState(false);
  const [favorites, setFavorites] = useState();

  const getFavorites = async () => {
    // LISTEN FOR REALTIME UPDATES

    // it is enough to call once then it will listen on its own
    // useEffect(()=>{getFavorites()},[])

    const userRef = firestore.doc(`users/${auth.currentUser?.uid}`);
    userRef.onSnapshot(
      (snapshot) => {
        setFavorites(snapshot.data()?.favorites);
        console.log(`Received doc snapshot: ${snapshot}`);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    // GET DATA ONCE

    // const userRef = firestore.doc(`users/${auth.currentUser?.uid}`);
    // const snapshot = await userRef.get();
    // if (!snapshot.exists) {
    //   console.log("No such document!");
    // } else {
    //   setFavorites(snapshot.data().favorites);
    //   console.log( 'set', snapshot.data().favorites)
    // }
  };

  const createFavorites = async (data) => {
    const userRef = firestore.doc(`users/${auth.currentUser?.uid}`);
    await userRef.set({ favorites: [data] });
  };

  const addToFavorites = async (data) => {
    const userRef = firestore.doc(`users/${auth.currentUser?.uid}`);
    await userRef.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(data),
    });
  };

  const removeFromFavorites = async (data) => {
    const userRef = firestore.doc(`users/${auth.currentUser?.uid}`);
    await userRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(data),
    });
  };

  const fetchQueryData = async () => {
    const {
      data: { items },
    } = await axios.get(baseUrl, {
      params: { q: query, maxResults: 40, key: apiKey },
    });
    setQueryData(items);
  };

  useEffect(fetchQueryData, [query]);

  useEffect(() => {
    getFavorites();
  }, [auth.currentUser?.uid]);

  return (
    <Context.Provider
      value={{
        query,
        queryData,
        baseUrl,
        apiKey,
        hasSession,
        auth,
        setSession,
        favorites,
        createFavorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      <Header
        onSearch={(value) => {
          setQuery(value);
        }}
      />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/details/:id" component={Details} />
        <Route path="/favorites" component={Favorites} />
        <Route component={Error} />
      </Switch>
    </Context.Provider>
  );
}

export default App;
