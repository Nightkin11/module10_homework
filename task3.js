const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.getElementById("output");
const btnSend = document.querySelector('.chat-btn-send');
const btnGeo = document.querySelector('.chat-btn-geo')


window.onload = function () {
    var scrollinDiv = document.getElementById("output");
    setInterval(function () {
        scrollinDiv.scrollTop = 9999;
    }, 100);
}

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.margin = "8px";
    pre.innerHTML = message;
    output.appendChild(pre);
}

let websocket;

// function start() {
websocket = new WebSocket(wsUri);
websocket.onopen = function (evt) {
    writeToScreen(`<span class="recieve-message">Connected</span>`);
};
websocket.onclose = function (evt) {
    writeToScreen(`<span class="recieve-message">Disconnected</span>`);
};
websocket.onmessage = function (evt) {
    writeToScreen(
        '<span class="recieve-message">Ответ: ' + evt.data + '</span>'
    );
};
websocket.onerror = function (evt) {
    writeToScreen(
        '<span class="recieve-message">Ошибка:</span> ' + evt.data
    );
};
// };

// start();


// Функция, выводящая текст об ошибке
const error = () => {
    writeToScreen('<span class="recieve-message">Невозможно получить ваше местоположение</span>');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // writeToScreen(`<span class="recieve-message">Широта: ${latitude} °, Долгота: ${longitude} °</span>`);
    writeToScreen(`<span class="recieve-message"><a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ссылка на карту</a></span>`);
}


btnGeo.addEventListener('click', () => {
    const message = 'Геолокация';
    writeToScreen(`<span class='send-message'>` + message + `</span>`);

    if (!navigator.geolocation) {
        writeToScreen('<span class="recieve-message">Geolocation не поддерживается вашим браузером</span>');
    } else {
        writeToScreen('<span class="recieve-message">Определение местоположения…</span>');
        navigator.geolocation.getCurrentPosition(success, error);
    }
});


btnSend.addEventListener('click', () => {
    const message = document.querySelector(`.chat-input`).value;
    writeToScreen(`<span class='send-message'>` + message + `</span>`);
    websocket.send(message);
});

/* btnGeo.addEventListener('click', () => {
    const message = 'Геолокация';
    writeToScreen(`<span class='send-message'>` + message + `</span>`);
    websocket.send(message);
}); */

