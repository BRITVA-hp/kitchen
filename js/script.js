window.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.slider__tab'),
        slides = document.querySelectorAll('.slider__box'),
        next = document.querySelector('.slider__arrow--next'),
        prev = document.querySelector('.slider__arrow--prev'),
        sliderWind = document.querySelector('.slider__wrap--tab'),
        sliderField = document.querySelector('.slider__row--tab'),
        tabsMap = document.querySelectorAll('.contacts__tabs-item'),
        footerMenu = document.querySelector('.footer__menu-header'),
        minus = document.querySelectorAll('.offer__minus'),
        plus = document.querySelectorAll('.offer__plus'),
        offerTabItems = document.querySelectorAll('.offer__tabs-item'),
        offerWraps = document.querySelectorAll('.offer__wrap'),
        offerNext = document.querySelector('.offer__tabs-arrow--next'),
        offerPrev = document.querySelector('.offer__tabs-arrow--prev'),
        filters = document.querySelectorAll('.filter__trigger'),
        filtersWrap = document.querySelector('.filter'),
        productTabs = document.querySelectorAll('.product__tabs-tab'),
        productTabsTexts = document.querySelectorAll('.product__tabs-text'),
        productComments = document.querySelector('.product-comments'),
        header = document.querySelector('.header'),
        headerBurger = document.querySelector('.header__burger'),
        menu = document.querySelector('.menu'),
        menuLinkMenu = document.querySelector('.menu__link--menu'),
        menuInner = document.querySelector('.menu__inner'),
        cabHistAccordContents = document.querySelectorAll('.cab-hist__accord-content'),
        addMenu = document.querySelector('.add-menu'),
        addMenuBurger = document.querySelector('.add-menu__burger');



  // Тренировка 


  // const mask = (selector) => {
  
  //   let setCursorPosition = (pos, elem) => {
  //     elem.focus();

  //     if (elem.setSelectionRange) {
  //       elem.setSelectionRange(pos, pos);
  //     } else if (elem.createTextRange) {
  //       let range = elem.createTextRange();

  //       range.collapse(true);
  //       range.moveEnd('character', pos);
  //       range.moveStart('character', pos);
  //       range.select();
  //     }
  //   };

  //   const createMask = function(event) {
  //     let matrix = '+7 (___) ___ __ __',
  //         i = 0,
  //         def = matrix.replace(/\D/g, ''),
  //         val = this.value.replace(/\D/g, '');

  //     if (def.length >= val.length) {
  //       val = def;
  //     }

  //     if (val[1] == 9) {
  //       this.value = matrix.replace(/./g, function(a) {
  //         return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
  //       });
  //     } else {
  //       this.value = '+7';
  //     }
      

  //     if (event.type == 'blur') {
  //       if (this.value.length == 2) {
  //         this.value = '';
  //       }
  //     } else {
  //       setCursorPosition(this.value.length, this);
  //     }
  //   };

  //   let inputs = document.querySelectorAll(selector);

  //   inputs.forEach(input => {
  //     input.addEventListener('input', createMask);
  //     input.addEventListener('focus', createMask);
  //     input.addEventListener('blur', createMask);
  //   });

  // };

  // mask('[type="tel"]');

  //Вспомогательные переменные

  let touchStart,
      touchEnd,
      counterForSwipe = 0,
      counter = 0,
      offerCount = 0,
      dotsInBasket,
      arrTimeout = [],
      similarProducts = [];

  localStorage.setItem('similarProducts', `${JSON.stringify(similarProducts)}`);

  // Функция для оценки на странице product

  function review(stars, activeClass, activeClassClick, parentAttribute) {
    const stars_ = document.querySelectorAll(stars);

    if (stars_.length > 0) {

      stars_.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
          for (let i = 0; i < index + 1; i++) {
            stars_[i].classList.add(activeClass);
          }
        });
      });

      stars_.forEach(item => {
        item.addEventListener('mouseout', () => {
          clearActiveClass(stars_, activeClass);
        });
      });

      stars_.forEach((item, index) => {
        item.addEventListener('click', () => {
          item.parentElement.setAttribute(parentAttribute, index + 1);
          clearActiveClass(stars_, activeClassClick);

          for (let i = 0; i < index + 1; i++) {
            stars_[i].classList.add(activeClassClick);
          }
        });
      });
    }
  }

  review('.comment__stars__item', 'comment__stars__item--active', 'comment__stars__item--active--click', 'data-rating');

  // Функция для занесения данных в LocalStorage (похожие товары)

  function similarProductsInLS(data) {
    let similarProducts_ = JSON.parse(`${localStorage.getItem('similarProducts')}`);

    const checkId = function(e) {
      if (e.id) {
        return e.id === data.id;
      }
    };

    if (!similarProducts_.some(checkId)) {
      if (similarProducts_.length < 10) {
        similarProducts_.push(data);
        localStorage.setItem('similarProducts', `${JSON.stringify(similarProducts_)}`);
      } else {
        similarProducts_.unshift(data);
        similarProducts_.pop();
        localStorage.setItem('similarProducts', `${JSON.stringify(similarProducts_)}`);
      }
    }
  }

  // форма для отзыва на product.html

  function comment(commentForm, commentFormActiveClass, triggers, commentFormClose) {
    const form = document.querySelector(commentForm),
          formTriggers = document.querySelectorAll(triggers),
          commentFormClose_ = document.querySelector(commentFormClose);

    if (formTriggers.length > 0) {
      formTriggers.forEach(item => {
        item.addEventListener('click', () => {
          form.classList.add(commentFormActiveClass);
        });
      });

      commentFormClose_.addEventListener('click', () => {
        form.classList.remove(commentFormActiveClass);
      });
    }
  }

  comment('.comment', 'comment--active', '.product__tabs__button', '.comment__close');

  // Появление доп. меню

  if (addMenuBurger) {
    addMenuBurger.addEventListener('click', () => {
      addMenu.classList.toggle('add-menu--active');
    });
  }

  // функция для анимации при скролле

  function animateScroll(section, elements, activeClass) {
    const section_ = document.querySelector(section);
          
    
    let delay = 0;

    if (section_) {
      const elements_ = section_.querySelectorAll(elements);
      elements_.forEach(item => {
        item.style.animationDelay = `${delay}s`;
        delay += 0.5;
      });
      document.addEventListener('scroll', () => {
        if (section_.getBoundingClientRect().top < 150) {
          elements_.forEach(item => {
            item.classList.add(activeClass);
          });
        }
      });
    }
  }

  animateScroll('.step', '.step__circle__inner', 'step__circle__inner--active');
  animateScroll('.advantages', '.step__circle__inner', 'step__circle__inner--active');

  // анимация на (листиков) главной

  function paralax(container, elements) {
    const container_ = document.querySelector(container),
          elements_ = document.querySelectorAll(elements);

    if (container_) {
      const containerWidth = container_.scrollWidth,
            containerHeight = container_.scrollHeight;

      container_.addEventListener('mousemove', (e) => {
        let pos_x = e.pageX,
            pos_y = e.pageY - (container_.getBoundingClientRect().top + document.documentElement.scrollTop),
            left = containerWidth / 2 - pos_x,
            top  = containerHeight / 2 - pos_y,
            x = 12;
        
        elements_.forEach(item => {
          item.style.cssText = `
            transform: translate(${left / x}px, ${top / (x/2)}px);
            transition-timing-function: ease-out;
            -webkit-transition-timing-function: ease-out;
            -o-transition-timing-function: ease-out;
            -moz-transition-timing-function: ease-out;
            transition-duration: 0.5s;
          `;
          x = x/1.3;
        });
  
      });
    }
  }

  paralax('.main', '.main__leafs');
  paralax('.doubt', '.doubt__leafs');
  paralax('.faq__container', '.faq__leaf');
  paralax('.advantages', '.advantages__olives');
  paralax('.questions__container', '.questions__leaf');
  paralax('.we__box', '.we__leaf');


  // вызов модалки в vacancies.html

  function modal(triggers, modal, visibleClass, modalClose) {
    const triggers_ = document.querySelectorAll(triggers),
          modal_ = document.querySelector(modal),
          modalClose_ = document.querySelector(modalClose);

    if (triggers_.length > 0) {
      triggers_.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          modal_.classList.add(visibleClass);
        });
      });
  
      modalClose_.addEventListener('click', () => {
        modal_.classList.remove(visibleClass);
      });
      modal_.addEventListener('click', (e) => {
        if (e.target.classList.contains(visibleClass)) {
          modal_.classList.remove(visibleClass);
        }
      });
    }
  }

  modal('.vac__link', '.vac__modal', 'vac__modal--visible', '.vac__modal__close');
  modal('#modal', '.modal', 'modal--visible', '.modal__close');


  // Функция для табов (универсальная) на странице questions.html

  function tabsUni(selectorTabs, selectorContents, activeClassTab, activeClassContent) {
    const tabs_ = document.querySelectorAll(selectorTabs),
          contents_ = document.querySelectorAll(selectorContents);

    if (tabs_.length > 0) {
      tabs_.forEach((tab, i) => {
        tab.addEventListener('click', () => {
          clearActiveClass(tabs_, activeClassTab);
          clearActiveClass(contents_, activeClassContent);
          tab.classList.add(activeClassTab);
          contents_.forEach((content, y)=> {
            if (i == y) {
              content.classList.add(activeClassContent);
            }
          });
        });
      });
    }
  }

  tabsUni('.questions__header__item', '.questions__accord', 'questions__header__item--active', 'questions__accord--active');
  tabsUni('.blog__tabs__item', '.blog__box', 'blog__tabs__item--active', 'blog__box--active');

  // При изменении размера экрана

  window.addEventListener('resize', () => {
    sliderWidthInner('.other-recipe__inner', '.recipes__card', '.offer__tabs-arrow--prev', '.offer__tabs-arrow--next', 721, 288);
    slideDots('.basket__card', '.basket__box--right', '.basket__window', false, 'basket__dot--active', 'basket__dot', 320, 320);
    slideDots('.headb__slider__card', '.headb__inner', '.headb__window', false, 'headb__dot--active', 'headb__dot', 155, 175);
  });

  // Программно устанавливаем высоту контента состава заказа в личном кабинете (для плавной анимации)

  if (cabHistAccordContents.length > 0) {
    cabHistAccordContents.forEach(item => {
      item.style.maxHeight = item.scrollHeight + 'px';
    });
  }

  // слайдер с точками на странице basket.html

  function slideDots(slidesDots, innerDot, windowDot, wrapDots, dotClassActive, dotClass, slideWidthDots, swipeWidthDots, eventStart = 'touchstart', eventEnd = 'touchend') {
    const slidesDots_ = document.querySelectorAll(slidesDots),
          innerDot_ = document.querySelector(innerDot);
    if (wrapDots) {
      if (slidesDots_.length > 0) {
        slidesDots_.forEach((item, i) => {
          const dot = document.createElement( "div" );
          dot.classList.add(dotClass);
          document.querySelector(wrapDots).appendChild(dot);
          if (i == 0) {
            dot.classList.add(dotClassActive);
          }
        });
      }
    }

    if (slidesDots_.length > 0 && window.getComputedStyle(innerDot_).position == 'absolute') {
      innerDot_.style.width = `${slideWidthDots * slidesDots_.length + 20 * (slidesDots_.length - 1)}px`;
    } else {
      if (innerDot_) {
        innerDot_.style.width = `auto`;
        innerDot_.style.transform = 'translateX(0)';

      }
    }
    swipeProgress(windowDot, innerDot, slidesDots, '.hello', swipeWidthDots, dotClass, dotClassActive, true, eventStart, eventEnd);
  }

  slideDots('.basket__card', '.basket__box--right', '.basket__window','.basket__dots', 'basket__dot--active', 'basket__dot', 320, 320);
  slideDots('.headb__slider__card', '.headb__inner', '.headb__window', '.headb__slider__dots', 'headb__dot--active', 'headb__dot', 155, 175, 'mousedown', 'mouseup');


  // Функция для слайдера на странице recipe.html

  function sliderWidthInner(innerSelector, slideSelector, arrowPrev, arrowNext, widthSlide, widthSlideMobile) {
    const inner_ = document.querySelector(innerSelector),
          slides_ = document.querySelectorAll(slideSelector),
          arrowPrev_ = document.querySelector(arrowPrev),
          arrowNext_ = document.querySelector(arrowNext);

    if (inner_) {
      if (window.getComputedStyle(inner_).position == 'absolute') {
        inner_.style.width = `${widthSlideMobile * slides_.length + 15 * (slides_.length - 1)}px`;
        swipeProgress(".other-recipe__window", '.other-recipe__inner', '.recipes__card', '.progress__inner--other-recipe', 303);
      } else {
        let counter_ = 0;

        inner_.style.width = `${widthSlide * slides_.length + 55 * (slides_.length - 1)}px`;
        arrowNext_.addEventListener('click', () => {
          counter_++;
          if (counter_ >= slides_.length) {
            counter_ = slides_.length - 1;
          }
          inner_.style.transform = `translateX(-${(widthSlide + 55) * counter_}px)`;
        });
        arrowPrev_.addEventListener('click', () => {
          counter_--;
          if (counter_ <= 0) {
            counter_ = 0;
          }
          inner_.style.transform = `translateX(-${(widthSlide + 55) * counter_}px)`;
        });
      }
    }
  }

  sliderWidthInner('.other-recipe__inner', '.recipes__card', '.offer__tabs-arrow--prev', '.offer__tabs-arrow--next', 721, 288);

  // функция для табов (в секции recipes)

  function swipeSimple(row) {
    const row_ = document.querySelector(row);
    let touchStart_;
    let touchEnd_;
    let supCount_ = 0;

    if (row_) {
      row_.addEventListener('touchstart', (e) => {
        touchStart_ = e.changedTouches[0].pageX;
      });

      row_.addEventListener('touchmove', (e) => {
        if (window.getComputedStyle(row_).position == 'absolute') {
          let touchMove_;
          touchMove_ = e.changedTouches[0].pageX - touchStart_;
          row_.style.transform = `translateX(${touchMove_ + supCount_}px)`;
        } else {
          row_.style.transform = `translateX(0px)`;
          supCount_ = 0;
        }
        
      });

      row_.addEventListener('touchend', (e) => {
        if (window.getComputedStyle(row_).width.replace(/\D/g, '') < document.documentElement.clientWidth) {
          row_.style.transform = `translateX(0px)`;
          supCount_ = 0;
        } else {
          touchEnd_ = e.changedTouches[0].pageX - touchStart_;
          supCount_ += touchEnd_;
          if (row_.getBoundingClientRect().right < document.documentElement.clientWidth || (touchEnd_ < 0 && Math.abs(touchEnd_) > Math.abs(row_.getBoundingClientRect().right) - document.documentElement.clientWidth)) {
            row_.style.transform = `translateX(-${+window.getComputedStyle(row_).width.replace(/\D/g, '') - document.documentElement.clientWidth + 40}px)`;
            supCount_ = -((+window.getComputedStyle(row_).width.replace(/\D/g, '')) - document.documentElement.clientWidth + 20);
          }
          if (row_.getBoundingClientRect().left > 10 || (touchEnd_ > 0 && Math.abs(touchEnd_) > Math.abs(row_.getBoundingClientRect().left))) {
            row_.style.transform = `translateX(0px)`;
            supCount_ = 0;
          }
        }
      });

    }
  }

  function tabsSimple(tabs, contents, activeClassTab, activeClassCont) {
   const tabs_ = document.querySelectorAll(tabs),
         contents_ = document.querySelectorAll(contents);

    if (tabs_.length > 0) {
      tabs_.forEach((item, i) => {
        item.addEventListener('click', () => {
          clearActiveClass( tabs_, activeClassTab.slice(1));
          clearActiveClass( contents_, activeClassCont.slice(1));
          item.classList.add(activeClassTab.slice(1));
          contents_.forEach((item_, y) => {
            if (i == y) {
              item_.classList.add(activeClassCont.slice(1));
            }
          });
        });
      });
    }

  }

  tabsSimple('.recipes__tabs-item', '.recipes__row', '.recipes__tabs-item--active', '.recipes__row--active');
  swipeSimple('.recipes__tabs');
  swipeSimple('.questions__header');

  // появление меню при нажатии на бургер

  menuLinkMenu.addEventListener('click', (e) => {
    e.preventDefault();
    menuLinkMenu.firstElementChild.classList.toggle('menu__arrow--active');
    if (menuLinkMenu.firstElementChild.classList.contains('menu__arrow--active')) {
      menuInner.style.maxHeight = `${menuInner.scrollHeight}px`;
      menu.style.maxHeight = `${menu.scrollHeight + menuInner.scrollHeight}px`;
    } else {
      menuInner.style.maxHeight = `0px`;
    }
  });

  headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    if (headerBurger.classList.contains('header__burger--active')) {
      header.style.maxHeight = `${header.scrollHeight}px`;
      header.style.overflow = `auto`;
      menu.style.maxHeight = `100%`;
    } else {
      header.style.maxHeight = '80px';
      header.style.overflow = 'hidden';
      menuLinkMenu.firstElementChild.classList.remove('menu__arrow--active');
      menuInner.style.maxHeight = `0px`;
      menu.style.maxHeight = `0px`;
    }
  });

  // header при скролле

  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 100) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
  });

  // Табы на странице product

  if (productTabs.length > 0) {
    productTabs.forEach( (productTab, i) => {
      productTab.addEventListener('click', () => {
        clearActiveClass(productTabs, 'product__tabs-tab--active');
        clearActiveClass(productTabsTexts, 'product__tabs-text--active');
        if (i == 1) {
          productComments.classList.add('product-comments--active');
        } else {
          productComments.classList.remove('product-comments--active');
        }
        productTab.classList.add('product__tabs-tab--active');
        productTabsTexts.forEach((productTabsText, y) => {
            if (i == y) {
              productTabsText.classList.add('product__tabs-text--active');
            }
        });
      });
    });
  }  

  // фильтр на мобилке

  filters.forEach(item => {
    item.addEventListener('click', () => {
      filtersWrap.classList.toggle('filter--active');
    });
  });

  // табы и слайдер в секции offer

  if (offerNext) {
    offerNext.addEventListener('click', () => {
      offerCount++;
      if (offerTabItems.length > 0) {
        offerTabItems.forEach((offerTabItem, i) => {
          if (offerTabItem.classList.contains('offer__tabs-item--active')) {
            offerWraps.forEach((offerWrap, y) => {
              if (i === y) {
                let offerCardWidth = window.getComputedStyle(offerWrap.querySelector('.offer__card')).width;
                if (offerWrap.firstElementChild.getBoundingClientRect().right < document.documentElement.clientWidth) {
                  offerCount--;
                }
                offerWrap.firstElementChild.style.transform = `translateX(-${+offerCardWidth.replace(/\D/g, '') * offerCount + 20}px)`;
              }
            });
          }
        });
      } else {
          offerWraps.forEach(offerWrap => {
            let offerCardWidth = window.getComputedStyle(offerWrap.querySelector('.offer__card')).width;
            if (offerWrap.firstElementChild.getBoundingClientRect().right < document.documentElement.clientWidth) {
              offerCount--;
            }
            offerWrap.firstElementChild.style.transform = `translateX(-${+offerCardWidth.replace(/\D/g, '') * offerCount + 20}px)`;

          });
        }
    });
  }

  if (offerPrev) {
    offerPrev.addEventListener('click', () => {
      console.log(offerCount);
      offerCount--;
      if (offerTabItems.length > 0) {
        offerTabItems.forEach((offerTabItem, i) => {
          if (offerTabItem.classList.contains('offer__tabs-item--active')) {
            offerWraps.forEach((offerWrap, y) => {
              if (i === y) {
                let offerCardWidth = window.getComputedStyle(offerWrap.querySelector('.offer__card')).width;
                if (offerCount < 0) {
                  offerCount = 0;
                }
                offerWrap.firstElementChild.style.transform = `translateX(-${+offerCardWidth.replace(/\D/g, '') * offerCount }px)`;
              }
            });
          }
        });
      } else {
        offerWraps.forEach(offerWrap => {
          let offerCardWidth = window.getComputedStyle(offerWrap.querySelector('.offer__card')  ).width;
          if (offerCount < 0) {
            offerCount = 0;
          }
          offerWrap.firstElementChild.style.transform = `translateX(-${+offerCardWidth.replace(/\D/g, '') * offerCount }px)`;
        
        });
      }
    });
  }

  if (offerTabItems.length > 0  ) {
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
  }


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
    if (document.querySelector('#contactsMap')) {
      ymaps.ready(init);
    }
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
    const arrAccord = document.querySelectorAll(arr);

    if (arrAccord.length > 0) {
      arrAccord.forEach(item => {
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
  }

  accordion('.contacts__accord-row', 'contacts__accord-row--active', 20);
  accordion('.faq__tab-row', 'faq__tab-row--active', 20);
  accordion(".recipe__step-header", "recipe__step-header--active", 20);
  accordion(".cab-hist__accord-header", "cab-hist__accord-header--active", 20);
  accordion(".questions__accord__header", "questions__accord__header--active", 20);

  //Свайп слайдера с прогрессом и точками

  function swipeProgress(slWind, slField, slSlides, slProgress, slideWidth, dots, activeClassDot, auto, eventStart = 'touchstart', eventEnd = 'touchend') {
    const sliderProgressWind = document.querySelector(slWind),
          sliderProgressField = document.querySelector(slField),
          sliderProgressSlides = document.querySelectorAll(slSlides),
          sliderProgress = document.querySelector(slProgress),
          progressStep = 100 / sliderProgressSlides.length,
          dots_ = document.querySelectorAll('.' + dots);

    if (sliderProgressWind) {
      let touchProgressStart;
      let touchProgressEnd;
      let counterSwipeProgress = 1;
      let sliderProgressFieldPos = window.getComputedStyle(sliderProgressField).position;
      let paused;

      for (var i=0; i<arrTimeout.length - 2; i++) {
        clearTimeout(arrTimeout[i]);
      }
      
      const moveMouse = function (e) {
        e.preventDefault();
          let mouseProgressMove;
          mouseProgressMove = e.pageX - touchProgressStart;
          sliderProgressField.style.transform = `translateX(${mouseProgressMove - slideWidth * (counterSwipeProgress - 1)}px)`;
      };

      const sliderDots = function () {
        if (dots_) {
          dots_.forEach((item, i) => {
            if (counterSwipeProgress - 1 == i) {
              clearActiveClass(dots_, activeClassDot);
              item.classList.add(activeClassDot);
            }
          });
        }
      };

      window.addEventListener('resize', () => {
        sliderProgressFieldPos = window.getComputedStyle(sliderProgressField).position;
      });
  
      if (sliderProgress) {
        sliderProgress.style.width = `${progressStep}%`;
      }
  
      sliderProgressWind.addEventListener(eventStart, (e) => {
        if (eventStart == 'touchstart') {
          touchProgressStart = e.changedTouches[0].pageX;
        } else {
          touchProgressStart = e.pageX;
          
          sliderProgressWind.addEventListener('mousemove', moveMouse);
          sliderProgressWind.addEventListener('mouseleave', () => {
            sliderProgressField.style.transform = `translateX(-${slideWidth * (counterSwipeProgress - 1)}px)`;
            sliderProgressWind.removeEventListener('mousemove', moveMouse);
          });

        }
        clearInterval(paused);
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
    
      sliderProgressWind.addEventListener(eventEnd, (e) => {
        sliderProgressWind.removeEventListener('mousemove', moveMouse);
        if (sliderProgressFieldPos == 'absolute') {
          if (eventEnd == 'touchend') {
            touchProgressEnd = e.changedTouches[0].pageX - touchProgressStart;
          } else {
            touchProgressEnd = e.pageX - touchProgressStart;
          }
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
        sliderDots();
        if (sliderProgress) {
          sliderProgress.style.width = `${progressStep * counterSwipeProgress}%`;
        }
        checkAuto();
      });

      const sliderAuto = function () {
        if (counterSwipeProgress == sliderProgressSlides.length) {
          sliderProgressField.style.transform = `translateX(0px)`;
          counterSwipeProgress = 1;
        } else {
          sliderProgressField.style.transform = `translateX(-${slideWidth * counterSwipeProgress}px)`;
          counterSwipeProgress++;
        }
        sliderDots();
      };

      const checkAuto = function () {
        if (auto && sliderProgressFieldPos == 'absolute') {
          paused = setInterval(sliderAuto,3000);
          arrTimeout.push(paused);
        } else {
          clearInterval(paused);
        }
      };
      
      sliderProgressWind.addEventListener('mouseenter', () => {
        clearInterval(paused);
      });
      sliderProgressWind.addEventListener('mouseleave', () => {
        checkAuto(); 
      });
      checkAuto();
    }
  }

  swipeProgress('.stock__wrap', '.stock__row', '.stock__card', '.progress__inner--stock', 270);
  swipeProgress('.inst__wrap', '.inst__row', '.inst__card', '.progress__inner--inst', 225);

  // свайп табов в секции slider

  function swipeTabs() {
    if (sliderWind) {
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
  }
  swipeTabs();

  // Переключение табов в секции slider

  if (tabs.length > 0) {
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        clearActiveClass(tabs, 'slider__tab--active');
        clearActiveClass(slides, 'slider__box--active');
        tab.classList.add('slider__tab--active');
        addActiveClass(slides, 'slider__box--active', i);
        counter = i;
      });
    });
  }

  if (next) {
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
  }

  if (prev) {
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
  }

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