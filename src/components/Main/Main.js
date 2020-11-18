import { useEffect, useState } from "react";
import { Header, Navbar, Slider } from "./";
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
  const [bookList, setBookList] = useState();
  const [chosenAuthorFullName, setChosenAuthorFullName] = useState();

  const fetchData = async () => {
    let chosenAuthor = Object.keys(authors)[
      Math.floor(Math.random() * Object.keys(authors).length)
    ];

    setChosenAuthorFullName(authors[chosenAuthor]);

    const {
      data: { items },
    } = await axios.get(baseUrl, {
      params: { q: "inauthor:" + chosenAuthor, maxResults: 40, key: apiKey },
    });
    setBookList(items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(bookList);
  return (
    <>
      <Header />
      <Navbar />
      <Slider chosenAuthorFullName={chosenAuthorFullName} bookList={bookList} />
    </>
  );
};

export default Main;
