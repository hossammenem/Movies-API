export default function sliderFunction(){
  const slides: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide: HTMLElement, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  let curSlide = 0;
  let maxSlide = slides.length;

  const nextSlide: HTMLElement | null = document.querySelector(".btn-next") ?? null;
  if(nextSlide) {
    nextSlide.addEventListener("click", function () {
      if ((maxSlide-curSlide) === 3) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });
  }

  const prevSlide: HTMLElement | null = document.querySelector(".btn-prev") ?? null;
  if(prevSlide) {
    prevSlide.addEventListener("click", function () {
      if (curSlide === 0) {
        curSlide = (maxSlide-3);
      } else {
        curSlide--;
      }

      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });
  }
}