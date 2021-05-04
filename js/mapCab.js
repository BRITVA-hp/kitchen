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
        const mapCab = new ymaps.Map("mapCab", {
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
                        mapCab.geoObjects.removeAll();
                        mapCab.geoObjects.add(res.geoObjects);
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

        mapCab.behaviors.disable('scrollZoom');

        // Обработчик события на поле подсказки

        suggestView_.events.add('select', addPlacemark);

        // Обработчик события на инпут при потере фокуса

        input.addEventListener('blur', addPlacemark);

    }
});