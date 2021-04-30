window.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector('#inputMap');

    input.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            this.blur();
        }
    });

    ymaps.ready(init);


    function init(){


        let center_ = [55.76, 37.64],
            coords,
            distance;

        // Создание карты.
        const mapOrder = new ymaps.Map("mapOrder", {
            center: center_,
            zoom: 7
        });


        // Подсказки

        const suggestView_ = new ymaps.SuggestView('inputMap');

        // Функция для добавления метки на карту и вычисления длины пути

        const addPlacemark = function () {

            if (input.value.length > 0) {
                let myGeocoder = ymaps.geocode(input.value);

                myGeocoder.then(
                    function (res) {
                        mapOrder.geoObjects.removeAll();
                        mapOrder.geoObjects.add(res.geoObjects);
                        coords = res.geoObjects.getBounds()[0];
                    
                    // Создаём путь между 2-мя точками и считаем расстояние
                
                    ymaps.route([center_, coords])
                    .then(function (route) {
                        distance = Math.round(route.getLength()/1000);
                        console.log(distance);
                    });

                    },
                    function (err) {
                        // Обработка ошибки.
                        console.log(err);
                    }
                );
            }

        };

        // Обработчик события на поле подсказки

        suggestView_.events.add('select', addPlacemark);

        // Обработчик события на инпут при потере фокуса

        input.addEventListener('blur', addPlacemark);

    }

    // Функция установкт даты

    const getTime = (calendar) => {
        const date = new Date(),
              calendar_ = document.querySelector(calendar);

        const addZero = (num) => {
            if (num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        };

        const checkTime = () => {
            if (date.getHours() < 15) {
                return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${date.getDate()}`;
            } else {
                const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                return `${tomorrow.getFullYear()}-${addZero(tomorrow.getMonth() + 1)}-${addZero(tomorrow.getDate())}`;
            }
        };

        console.log(checkTime());

        const today = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${date.getDate()}`;

        calendar_.setAttribute('value', `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`);
        calendar_.setAttribute('min', checkTime());
        calendar_.setAttribute('max', `${date.getFullYear() + 1}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`);
        
    };

    getTime('.order__input--date');


});