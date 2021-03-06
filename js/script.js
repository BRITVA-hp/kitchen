window.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.slider__tab'),
        slides = document.querySelectorAll('.slider__box'),
        next = document.querySelector('.slider__arrow--next'),
        prev = document.querySelector('.slider__arrow--prev'),
        sliderWind = document.querySelector('.slider__wrap--tab'),
        sliderField = sliderWind.querySelector('.slider__row--tab'),
        sliderFieldWidth = +window.getComputedStyle(sliderField).width.replace(/\D/g, '');

  let touchStart;
  let touchEnd;
  let counterForSwipe = 0;
  let counter = 0;

  //Свайп табов с прогрессом

  function swipeProgress(slWind, slField, slSlides, slProgress, slideWidth) {
    const sliderProgressWind = document.querySelector(slWind),
          sliderProgressField = document.querySelector(slField),
          sliderProgressSlides = document.querySelectorAll(slSlides),
          sliderProgress = document.querySelector(slProgress),
          progressStep = 100 / sliderProgressSlides.length;

    let sliderProgressFieldPos;
    let touchProgressStart;
    let touchProgressEnd;
    let counterSwipeProgress = 1;

    sliderProgress.style.width = `${progressStep}%`;

    sliderProgressWind.addEventListener('touchstart', (e) => {
      touchProgressStart = e.changedTouches[0].pageX;
    });
  
    sliderProgressWind.addEventListener('touchmove', (e) => {
      sliderProgressFieldPos = window.getComputedStyle(sliderProgressField).position;
      if (sliderProgressFieldPos == 'absolute') {
        let touchProgressMove;
        touchProgressMove = e.changedTouches[0].pageX - touchProgressStart;
        sliderProgressField.style.transform = `translateX(${touchProgressMove - slideWidth * (counterSwipeProgress - 1)}px)`;
      } else {
        sliderProgressField.style.transform = `translateX(0px)`;
      }
    });
  
    sliderProgressWind.addEventListener('touchend', (e) => {
      if (sliderProgressFieldPos == 'absolute') {
        touchProgressEnd = e.changedTouches[0].pageX - touchProgressStart;
        if (Math.abs(touchProgressEnd) > 150) {
          if (touchProgressEnd < 0) {
            sliderProgressField.style.transform = `translateX(-${slideWidth * counterSwipeProgress}px)`;
            counterSwipeProgress++;
            if (counterSwipeProgress >= sliderProgressSlides.length) {
              sliderProgressField.style.transform = `translateX(-${slideWidth * (sliderProgressSlides.length - 1)}px)`;
              counterSwipeProgress = sliderProgressSlides.length;
            }   
          } else {
              counterSwipeProgress--;
              sliderProgressField.style.transform = `translateX(-${slideWidth * (counterSwipeProgress - 1)}px)`;
              if (counterSwipeProgress <= 1) {
              sliderProgressField.style.transform = `translateX(0px)`;
              counterSwipeProgress = 1;
            }
          }
        } else {
          sliderProgressField.style.transform = `translateX(-${slideWidth * (counterSwipeProgress - 1)}px)`;
        }
      }
      sliderProgress.style.width = `${progressStep * counterSwipeProgress}%`;
    });
  }

  swipeProgress('.stock__wrap', '.stock__row', '.stock__card', '.progress__inner', 270);

  // свайп табов в секции slider

  function swipeTabs() {
    sliderWind.addEventListener('touchstart', (e) => {
      touchStart = e.changedTouches[0].pageX;
    });
  
    sliderWind.addEventListener('touchmove', (e) => {
      if (sliderFieldWidth + 10 > document.documentElement.clientWidth) {
        let touchMove;
        touchMove = e.changedTouches[0].pageX - touchStart;
        sliderField.style.transform = `translateX(${touchMove + counterForSwipe}px)`;
      } else {
        sliderField.style.transform = `translateX(0px)`;
      }
    });
  
    sliderWind.addEventListener('touchend', (e) => {
      let clientWidth = document.documentElement.clientWidth;
      touchEnd = e.changedTouches[0].pageX - touchStart;
      counterForSwipe += touchEnd;
      if (sliderField.getBoundingClientRect().right < clientWidth || (touchEnd < 0 && Math.abs(touchEnd) > Math.abs(sliderField.getBoundingClientRect().right) - clientWidth)) {
        sliderField.style.transform = `translateX(-${sliderFieldWidth - clientWidth + 20}px)`;
        counterForSwipe = -(sliderFieldWidth - clientWidth + 10);
      }
      if (sliderField.getBoundingClientRect().left > 0 || (touchEnd > 0 && Math.abs(touchEnd) > Math.abs(sliderField.getBoundingClientRect().left))) {
        sliderField.style.transform = `translateX(0px)`;
        counterForSwipe = 0;
      }
    });
  }
  swipeTabs();

  // Переключение табов в секции slider
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      clearActiveClass(tabs, 'slider__tab--active');
      clearActiveClass(slides, 'slider__box--active');
      tab.classList.add('slider__tab--active');
      addActiveClass(slides, 'slider__box--active', i);
      counter = i;
    });
  });

  next.addEventListener('click', () => {
    counter++;
    if (counter == tabs.length) {
      counter = 0;
    }
    clearActiveClass(tabs, 'slider__tab--active');
    clearActiveClass(slides, 'slider__box--active');
    addActiveClass(tabs, 'slider__tab--active', counter);
    addActiveClass(slides, 'slider__box--active', counter);
  });

  prev.addEventListener('click', () => {
    counter--;
    if (counter < 0) {
      counter = tabs.length - 1;
    }
    clearActiveClass(tabs, 'slider__tab--active');
    clearActiveClass(slides, 'slider__box--active');
    addActiveClass(tabs, 'slider__tab--active', counter);
    addActiveClass(slides, 'slider__box--active', counter);
  });

  function addActiveClass(arr, activeClass, count) {
    arr.forEach((item, i) => {
      if (count == i) {
        item.classList.add(activeClass);
      }
    });
  }

  function clearActiveClass(arr, activeClass) {
    arr.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

});