window.addEventListener('DOMContentLoaded', () => {

    ymaps.ready(init);

    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });

        myMap.geoObjects.add(new ymaps.Placemark([55.833436, 37.715175]));

        myMap.behaviors.disable('scrollZoom');
    }

});