window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#inputMap');

    input.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            this.blur();
        }
    });

    // Инициализация карты

    ymaps.ready(init);

    // Основная функция

    function init(){

        let center_ = [55.76, 37.64],
            coords,
            distance;

        // Создание карты.
        
        const mapCab = new ymaps.Map("mapCab", {
            center: center_,
            zoom: 11
        });

        // Подсказки

        const suggestView_ = new ymaps.SuggestView('inputMap');

        // Функция для добавления маршрута на карту и вычисления его длины

        const setRoute = (x, y) => {
            mapCab.geoObjects.removeAll();
            ymaps.route([x , y], {
                mapStateAutoApply: true
            })
            .then(function (route) {

                // Разрешаем перемещать конечные точки маршрута

                route.editor.start();

                // Перебираем точки конечные маршрута, для их стилизации и запрета перемещения начальной точки.

                route.getWayPoints().each((point) => {
                    point.options.set({
                        preset: 'islands#blackStretchyIcon'
                    });
                    if (point.options._name == "startWayPoint") {
                            point.options.set({
                            draggable: false
                        });
                    }
                });

                // Считаем длину пути в км.

                distance = Math.round(route.getLength()/1000);
                console.log(distance);

                // Добавляем путь на карту

                mapCab.geoObjects.add(route);

                // При изменении геометрии пути считается его длина

                route.events.add('geometrychange', () => {
                    distance = Math.round(route.getLength()/1000);
                    console.log(distance);
                });
            });
        };

        setRoute(center_, [55.8, 37.7]);

        // Функция для поиска координат адреса из инпута, с последующим построением соответствующего пути

        const geocodeInput = function () {

            if (input.value.length > 0) {
                let myGeocoder = ymaps.geocode(input.value);

                myGeocoder.then(
                    function (res) {
                        mapCab.geoObjects.add(res.geoObjects);
                        coords = res.geoObjects.getBounds()[0];
                        mapCab.geoObjects.removeAll();
                    
                    // Создаём путь между 2-мя точками и считаем расстояние

                    setRoute(center_, coords);

                    },
                    function (err) {
                        // Обработка ошибки.
                        console.log(err);
                    }
                );
            }

        };

        // Отключаем скролл

        mapCab.behaviors.disable('scrollZoom');

        // При клике по карте

        mapCab.events.add('click', (e) => {
            setRoute(center_, e.get('coords'));
        });

        // Обработчик события на поле подсказок

        suggestView_.events.add('select', geocodeInput);

        // Обработчик события на инпут при потере фокуса

        input.addEventListener('blur', geocodeInput);

    }
});