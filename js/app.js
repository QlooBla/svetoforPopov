document.addEventListener("DOMContentLoaded", () => {
    const lightA = document.getElementById('lightA');
    const lightB = document.getElementById('lightB');
    const counterA = document.getElementById('counterA');
    const counterB = document.getElementById('counterB');
    const startButton = document.getElementById('startButton');
    const timerDisplay = document.getElementById('timer');

    let carsA = 0;
    let carsB = 0;
    let timer = null;
    let currentLight = 'A';

    // Обработчики для кнопок счетчика дороги А
    document.querySelectorAll('#roadA .counter button')[0].onclick = () => {
        carsA++;
        counterA.textContent = carsA;
    };

    document.querySelectorAll('#roadA .counter button')[1].onclick = () => {
        if (carsA > 0) {
            carsA--;
            counterA.textContent = carsA;
        }
    };
    // Обработчики для кнопок счетчика дороги Б
    document.querySelectorAll('#roadB .counter button')[0].onclick = () => {
        carsB++;
        counterB.textContent = carsB;
    };

    document.querySelectorAll('#roadB .counter button')[1].onclick = () => {
        if (carsB > 0) {
            carsB--;
            counterB.textContent = carsB;
        }
    };

    // Запуск светофоров и таймеров при нажатии на кнопку старта
    startButton.onclick = () => {
        if (timer) return;

        let greenTimeA = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
        let greenTimeB = Math.floor(Math.random() * (60 - 10 + 1)) + 10;

        const switchLights = () => {
            if (currentLight === 'A') {
                setLight(lightA, 'red');
                setLight(lightB, 'green');
                currentLight = 'B';
                timer = setTimeout(switchLights, greenTimeB * 1000);
                startTimer(greenTimeB);
            } else {
                setLight(lightA, 'green');
                setLight(lightB, 'red');
                currentLight = 'A';
                timer = setTimeout(switchLights, greenTimeA * 1000);
                startTimer(greenTimeA);
            }
        };

        setLight(lightA, 'green');
        setLight(lightB, 'red');
        timer = setTimeout(switchLights, greenTimeA * 1000);
        startTimer(greenTimeA);
    };

    const setLight = (light, color) => {
        light.querySelector('.red').style.opacity = color === 'red' ? 1 : 0.3;
        light.querySelector('.yellow').style.opacity = 0.3;
        light.querySelector('.green').style.opacity = color === 'green' ? 1 : 0.3;
    };

    let tickCount = 0; // Переменная для подсчёта тиков таймера

    const startTimer = (duration) => {
        let timeLeft = duration;
        timerDisplay.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
        const interval = setInterval(() => {
            tickCount++; // Увеличиваем счётчик тиков
            timeLeft--;
            timerDisplay.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
            if (tickCount % 2 === 0) { // Уменьшаем количество машин только каждый второй тик
                if (currentLight === 'A' && carsA > 0) {
                    carsA--;
                    counterA.textContent = carsA;
                } else if (currentLight === 'B' && carsB > 0) {
                    carsB--;
                    counterB.textContent = carsB;
                }
            }
            if (timeLeft <= 0) clearInterval(interval);
        }, 1000);
    };
});
