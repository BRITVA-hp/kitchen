window.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.slider__tab'),
        slides = document.querySelectorAll('.slider__box'),
        next = document.querySelector('.slider__arrow--next'),
        prev = document.querySelector('.slider__arrow--prev');

  let counter = 0;

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