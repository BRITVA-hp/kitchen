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


  // свайп табов в секции slider

  const move = function(e) {
    if (sliderFieldWidth + 20 > document.documentElement.clientWidth) {
      console.log('rdf');
      let touchMove;
      touchMove = e.changedTouches[0].pageX - touchStart;
      sliderField.style.transform = `translateX(${touchMove + counterForSwipe}px)`;
    } else {
      sliderField.style.transform = `translateX(0px)`;
    }
  };
  
  // window.addEventListener('resize', () => {
  //   if (document.documentElement.clientWidth <= 715) {
  //     swipeTabs();
  //   } else {
  //     sliderField.style.transform = `translateX(0px)`;
  //     sliderWind.removeEventListener('touchmove', move);
  //   }
  // });

  // if (document.documentElement.clientWidth <= 715) {
  //   swipeTabs();
  // }

  function swipeTabs() {
    sliderWind.addEventListener('touchstart', (e) => {
      touchStart = e.changedTouches[0].pageX;
    });
  
    sliderWind.addEventListener('touchmove', move);
  
    sliderWind.addEventListener('touchend', (e) => {
      let clientWidth = document.documentElement.clientWidth;
      touchEnd = e.changedTouches[0].pageX - touchStart;
      counterForSwipe += touchEnd;
      console.log(touchEnd);
      console.log(sliderFieldWidth - clientWidth);
      if (sliderField.getBoundingClientRect().right < clientWidth - 10 || (touchEnd < 0 && Math.abs(touchEnd) > sliderFieldWidth - 150)) {
        sliderField.style.transform = `translateX(-${sliderFieldWidth - clientWidth + 20}px)`;
        counterForSwipe = -(sliderFieldWidth - clientWidth + 10);
      }
      if (sliderField.getBoundingClientRect().left > 10 || (touchEnd > 0 && Math.abs(touchEnd) > sliderFieldWidth - 150)) {
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