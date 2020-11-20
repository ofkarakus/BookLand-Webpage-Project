import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";

export const Context = createContext();
const baseUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = "AIzaSyBMJ_IyIfi1gfXiob41sgFmuwN5FUxAdMQ";

function App() {
  const [query, setQuery] = useState("");
  const [queryData, setQueryData] = useState();

  const fetchQueryData = async () => {
    const {
      data: { items },
    } = await axios.get(baseUrl, {
      params: { q: query, maxResults: 40, key: apiKey },
    });
    setQueryData(items);
  };

  useEffect(() => {
    fetchQueryData();
  }, [query]);

  return (
    <Context.Provider value={{ query, queryData, baseUrl, apiKey }}>
      <Header
        onSearch={(value) => {
          setQuery(value);
        }}
      />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/details" component={Details} />
        <Route component={Error} />
      </Switch>
    </Context.Provider>
  );
}

export default App;
