window.addEventListener('DOMContentLoaded', () => {

    // Функция установкт даты

    const getTime = (calendar) => {
        const date = new Date(),
              calendar_ = document.querySelector(calendar);

        if (calendar_) {
            const addZero = (num) => {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            };
    
            const checkTime = () => {
                const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000),
                      afterTomorrow = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
                if (date.getHours() < 15) {
                    return `${tomorrow.getFullYear()}-${addZero(tomorrow.getMonth() + 1)}-${addZero(tomorrow.getDate())}`;
                } else {
                    return `${afterTomorrow.getFullYear()}-${addZero(afterTomorrow.getMonth() + 1)}-${addZero(afterTomorrow.getDate())}`;
                }
            };
    
            const today = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${date.getDate()}`;
    
            calendar_.setAttribute('value', `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`);
            calendar_.setAttribute('min', checkTime());
            calendar_.setAttribute('max', `${date.getFullYear() + 1}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`);
        }
    };

    getTime('.order__input--calendar');

});