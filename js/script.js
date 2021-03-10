window.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.slider__tab'),
        slides = document.querySelectorAll('.slider__box'),
        next = document.querySelector('.slider__arrow--next'),
        prev = document.querySelector('.slider__arrow--prev'),
        sliderWind = document.querySelector('.slider__wrap--tab'),
        sliderField = document.querySelector('.slider__row--tab'),
        accordions = document.querySelectorAll('.contacts__accord-row'),
        accordionsFaq = document.querySelectorAll('.faq__tab-row'),
        tabsMap = document.querySelectorAll('.contacts__tabs-item'),
        footerMenu = document.querySelector('.footer__menu-header'),
        minus = document.querySelectorAll('.offer__minus'),
        plus = document.querySelectorAll('.offer__plus'),
        offerTabItems = document.querySelectorAll('.offer__tabs-item'),
        offerWraps = document.querySelectorAll('.offer__wrap'),
        offerNext = document.querySelector('.offer__tabs-arrow--next'),
        offerPrev = document.querySelector('.offer__tabs-arrow--prev');
        

  //Вспомогательные переменные

  let touchStart;
  let touchEnd;
  let counterForSwipe = 0;
  let counter = 0;
  let offerCount = 0;

  // табы и слайдер в секции offer

  offerNext.addEventListener('click', () => {
    offerCount++;
    offerTabItems.forEach((offerTabItem, i) => {
      if (offerTabItem.classList.contains('offer__tabs-item--active')) {
        offerWraps.forEach((offerWrap, y) => {
          if (i === y) {
            let offerCardWidth = window.getComputedStyle(offerWrap.firstElementChild.firstElementChild).width;
            if (offerWrap.firstElementChild.getBoundingClientRect().right < document.documentElement.clientWidth) {
              offerCount--;
            }
            offerWrap.firstElementChild.style.transform = `translateX(-${+offerCardWidth.replace(/\D/g, '') * offerCount + 20}px)`;
          }
        });
      }
    });
  });

  offerPrev.addEventListener('click', () => {
    offerCount--;
    offerTabItems.forEach((offerTabItem, i) => {
      if (offerTabItem.classList.contains('offer__tabs-item--active')) {
        offerWraps.forEach((offerWrap, y) => {
          if (i === y) {
            let offerCardWidth = window.getComputedStyle(offerWrap.firstElementChild.firstElementChild).width;
            if (offerCount < 0) {
              offerCount = 0;
            }
            offerWrap.firstElementChild.style.transform = `translateX(-${+offerCardWidth.replace(/\D/g, '') * offerCount }px)`;
          }
        });
      }
    });
  });

  offerTabItems.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      offerCount = 0;
      offerWraps.forEach((offerWrap, y) => {
        offerWrap.firstElementChild.style.transform = `translateX(0px)`;

      });
      clearActiveClass(offerTabItems, 'offer__tabs-item--active');
      clearActiveClass(offerWraps, 'offer__wrap--active');
      tab.classList.add('offer__tabs-item--active');
      offerWraps.forEach((offerWrap, y) => {
        if (i === y) {
          offerWrap.classList.add('offer__wrap--active');
        }
      });
    });
  });


  // количество в секции offer

  plus.forEach(item => {
    item.addEventListener('click', () => {
      let countOffer = +item.previousElementSibling.getAttribute('value') + 1;
      item.previousElementSibling.setAttribute('value', `${ countOffer}`); 
    });
  });

  minus.forEach(item => {
    item.addEventListener('click', () => {
      let countOffer = +item.nextElementSibling.getAttribute('value') - 1;
      if (countOffer  <= 1) {
        countOffer = 1;
      }
      item.nextElementSibling.setAttribute('value', `${ countOffer}`);
    });
  });

  // меню в футере

  footerMenu.addEventListener('click', () => {
    footerMenu.nextElementSibling.style.maxHeight = footerMenu.nextElementSibling.scrollHeight + 20 + 'px';
    footerMenu.nextElementSibling.style.paddingBottom = 20 + 'px';
    footerMenu.classList.toggle('footer__menu--active');
    if (footerMenu.classList.contains('footer__menu--active')) {
      footerMenu.nextElementSibling.style.maxHeight = 0 + 'px';
      footerMenu.nextElementSibling.style.paddingBottom = 0 + 'px';
    }
  });

  // Карта

    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("contactsMap", {
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10
        });

        // Метки на карту
        const placeMarks = [
                            [
                              new ymaps.Placemark([55.757131, 37.617114], {           //Маназины
                                  balloonContent: 'улица Охотный Ряд, 2'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmM.png',
                                    iconImageSize: [64, 64]
                                  }),
                              new ymaps.Placemark([55.873309, 37.664842], {          //Маназины
                                  balloonContent: 'г. Москва, ул. Енисейская, д. 29'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmM.png',
                                    iconImageSize: [64, 64]
                                  })
                            ],
                            [
                              new ymaps.Placemark([55.759309, 37.616279], {          //Кафе
                                  balloonContent: 'улица Охотный Ряд, 3, подъезд 7'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmC.png',
                                    iconImageSize: [64, 64]
                                  }),
                              new ymaps.Placemark([55.860822, 37.661230], {          //Кафе
                                  balloonContent: 'Енисейская улица, 10'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmC.png',
                                    iconImageSize: [64, 64]
                                  })
                            ],
                            [
                              new ymaps.Placemark([55.756300, 37.618641], {            //АЗС
                                  balloonContent: 'площадь Революции, 2/3'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmG.png',
                                    iconImageSize: [64, 64]
                                  }),
                              new ymaps.Placemark([55.767139, 37.646723], {            //АЗС
                                  balloonContent: 'Большой Козловский переулок, 6'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmG.png',
                                    iconImageSize: [64, 64]
                                  })
                            ],
                            [
                              new ymaps.Placemark([55.764197, 37.629861], {            //Фитнес-клубы
                                  balloonContent: 'улица Большая Лубянка, 20с2'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmF.png',
                                    iconImageSize: [64, 64]
                                  }),
                              new ymaps.Placemark([55.732180, 37.611167], {            //Фитнес-клубы
                                  balloonContent: 'улица Большая Якиманка, 50'
                                  }, {
                                    iconLayout: 'default#image',
                                    // Путь до нашей картинки
                                    iconImageHref: '/img/contacts/plcmF.png',
                                    iconImageSize: [64, 64]
                                  })
                            ]
                          ];
      myMap.behaviors.disable('scrollZoom');

      placeMarks[1].forEach(item => {
        myMap.geoObjects.add(item);
      });

      tabsMap.forEach((tab, i) => {
        tab.addEventListener('click', () => {
          clearActiveClass(tabsMap, 'contacts__tabs-item--active');
          tab.classList.add('contacts__tabs-item--active');
          placeMarks.forEach((item1, y, arr) => {
            arr[y].forEach((item2) => {
              myMap.geoObjects.remove(item2);
            });
            if (i == y) {
              arr[y].forEach((item3) => {
                myMap.geoObjects.add(item3);
              });
            }
          });
        });
      });
    }

  // Аккордион

  function accordion(arr, activeClass, paddings = 0) {
    arr.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle(activeClass);
        if (item.classList.contains(activeClass)) {
          item.nextElementSibling.style.maxHeight = item.nextElementSibling.scrollHeight + 'px';
          item.parentElement.style.paddingBottom = paddings + 'px';
          item.lastElementChild.lastElementChild.style.transform = 'rotate(90deg)';
        } else {
          item.nextElementSibling.style.maxHeight = '0px';
          item.parentElement.style.paddingBottom = 0 + 'px';
          item.lastElementChild.lastElementChild.style.transform = 'none';
        }
      });
    });
  }

  accordion(accordions, 'contacts__accord-row--active', 20);
  accordion(accordionsFaq, 'faq__tab-row--active', 20);

  //Свайп слайдера с прогрессом

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
        if (Math.abs(touchProgressEnd) > 100) {
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

  swipeProgress('.stock__wrap', '.stock__row', '.stock__card', '.progress__inner--stock', 270);
  swipeProgress('.inst__wrap', '.inst__row', '.inst__card', '.progress__inner--inst', 225);

  // свайп табов в секции slider

  function swipeTabs() {
    let sliderFieldWidth = +window.getComputedStyle(sliderField).width.replace(/\D/g, '');
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