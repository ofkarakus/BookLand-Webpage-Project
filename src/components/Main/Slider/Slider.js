import { useEffect } from "react";
import "./Slider.style.scss";
import '../../../assets/fonts/BerkshireSwash-Regular.ttf'

export const Slider = ({ bookList, chosenAuthorFullName }) => {
  let slideIndex = 0;

  useEffect(() => {
    showSlides();
  }, [bookList]);

  function showSlides() {
    if (bookList) {
      let slides = document.getElementsByClassName("slider__bookContainer__item");

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slideIndex == slides.length - 3 ? (slideIndex = 1) : slideIndex++;

      slides[slideIndex - 1].style.display = "block";
      slides[slideIndex].style.display = "block";
      slides[slideIndex + 1].style.display = "block";
      slides[slideIndex + 2].style.display = "block";

      setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
  }

  return (
    <div className="slider">
      <p className="slider__authorName">{chosenAuthorFullName}'s Books</p>
      <div className="slider__bookContainer">
        {bookList?.map((item, i) => (
          <div key={i} className="slider__bookContainer__item">
            <img
              className="slider__bookContainer__item__img"
              src={item?.volumeInfo?.imageLinks?.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
