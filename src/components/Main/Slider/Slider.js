import { useEffect } from "react";
import "./Slider.style.scss";
import bookDefault from "../../../assets/images/book-default.png";
import "../../../assets/fonts/BerkshireSwash-Regular.ttf";
import { useHistory } from "react-router-dom";

export const Slider = ({ sliderBookData, chosenAuthorFullName }) => {
  let slideIndex = 0;
  var timer;

  const history = useHistory();

  useEffect(showSlides, [sliderBookData]);

  // this is the last function will be executed before the Slider component unmount

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  // ------!!!-------

  function showSlides() {
    if (sliderBookData) {
      let slides = document.getElementsByClassName(
        "slider__bookContainer__item"
      );

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slideIndex === slides.length - 3 ? (slideIndex = 1) : slideIndex++;

      slides[slideIndex - 1].style.display = "block";
      slides[slideIndex].style.display = "block";
      slides[slideIndex + 1].style.display = "block";
      slides[slideIndex + 2].style.display = "block";

      timer = setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
  }

  return (
    <div className="slider">
      <p className="slider__authorName">{chosenAuthorFullName}'s Books</p>
      <div className="slider__bookContainer">
        {sliderBookData?.map((item, i) => (
          <div key={i} className="slider__bookContainer__item">
            <img
              onClick={() =>
                history.push({ pathname: `/details/${item.id}`, state: item })
              }
              alt="Book"
              className="slider__bookContainer__item__img"
              src={
                item?.volumeInfo?.imageLinks?.thumbnail
                  ? item.volumeInfo.imageLinks.thumbnail
                  : bookDefault
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
