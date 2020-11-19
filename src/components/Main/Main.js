import { useEffect, useState } from "react";
import { Header, Navbar, Slider, CardList, Footer } from "./";
import axios from "axios";

const baseUrl = "https://www.googleapis.com/books/v1/volumes";
const apiKey = "AIzaSyBMJ_IyIfi1gfXiob41sgFmuwN5FUxAdMQ";
const authors = {
  Tolstoy: "Leo Tolstoy",
  Dostoevsky: "Fyodor Dostoevsky",
  // Turgenev: "Ivan Turgenev",
  Kısakürek: "Necip Fazıl Kısakürek",
  "Yahya Kemal": "Yahya Kemal Beyatlı",
};

const Main = () => {
  const [sliderBookData, setSliderBookData] = useState();
  const [chosenAuthorFullName, setChosenAuthorFullName] = useState();
  const [cardListBookData, setCardListBookData] = useState();
  const [query, setQuery] = useState("");
  const [queryData, setQueryData] = useState();

  const fetchSliderData = async () => {
    let chosenAuthor = Object.keys(authors)[
      Math.floor(Math.random() * Object.keys(authors).length)
    ];

    setChosenAuthorFullName(authors[chosenAuthor]);

    const {
      data: { items },
    } = await axios.get(baseUrl, {
      params: { q: "inauthor:" + chosenAuthor, maxResults: 40, key: apiKey },
    });
    setSliderBookData(items);
  };

  const fetchCardListData = async () => {
    let chosenAuthor = Object.keys(authors)[
      Math.floor(Math.random() * Object.keys(authors).length)
    ];

    const {
      data: { items },
    } = await axios.get(baseUrl, {
      params: { q: "inauthor:" + chosenAuthor, maxResults: 40, key: apiKey },
    });
    setCardListBookData(items);
  };

  const fetchQueryData = async () => {
    const {
      data: { items },
    } = await axios.get(baseUrl, {
      params: { q: query, maxResults: 40, key: apiKey },
    });
    setQueryData(items);
  };

  useEffect(() => {
    fetchCardListData();
    fetchSliderData();
  }, []);

  useEffect(() => {
    fetchQueryData();
  }, [query]);

  return (
    <>
      <Header
        onSearch={(value) => {
          setQuery(value);
        }}
      />
      <Navbar />
      {query ? (
        <p
          style={{
            textAlign: "center",
            backgroundColor: "aliceblue",
            paddingTop: "2rem",
            fontWeight: "bold",
            fontSize: '1.3rem',
            color: '#455a64'
          }}
        >
          Search Results
        </p>
      ) : (
        <Slider
          chosenAuthorFullName={chosenAuthorFullName}
          sliderBookData={sliderBookData}
        />
      )}
      <CardList cardListBookData={cardListBookData} queryData={queryData} />
      <Footer />
    </>
  );
};

export default Main;
