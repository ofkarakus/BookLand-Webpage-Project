import { Context } from "../../App";
import { useEffect, useState, useContext } from "react";
import { Navbar, Slider, CardList, Footer } from "./";
import axios from "axios";

const authors = {
  Tolstoy: "Leo Tolstoy",
  Dostoevsky: "Fyodor Dostoevsky",
  // Turgenev: "Ivan Turgenev",
  Kısakürek: "Necip Fazıl Kısakürek",
  "Yahya Kemal": "Yahya Kemal Beyatlı",
};

const Main = () => {
  const { queryData, query, baseUrl, apiKey } = useContext(Context);
  const [sliderBookData, setSliderBookData] = useState();
  const [chosenAuthorFullName, setChosenAuthorFullName] = useState();
  const [cardListBookData, setCardListBookData] = useState();

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
      params: {
        q: "inauthor:" + chosenAuthor,
        maxResults: 40,
        key: apiKey,
        projection: "full",
      },
    });
    setCardListBookData(items);
  };

  useEffect(() => {
    fetchCardListData();
    fetchSliderData();
  }, []);

  return (
    <>
      <Navbar />
      {query ? (
        <p
          style={{
            textAlign: "center",
            backgroundColor: "aliceblue",
            paddingTop: "2rem",
            fontWeight: "bold",
            fontSize: "1.3rem",
            color: "#455a64",
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
