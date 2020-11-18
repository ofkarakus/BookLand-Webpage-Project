import { useEffect, useState } from "react";
import { Header, Navbar, Slider, CardList } from "./";
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

  useEffect(() => {
    fetchSliderData();
    fetchCardListData();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Slider chosenAuthorFullName={chosenAuthorFullName} sliderBookData={sliderBookData} />
      <CardList cardListBookData={cardListBookData} />
    </>
  );
};

export default Main;
