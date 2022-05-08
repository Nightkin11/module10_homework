/* Задание 2.

Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.  */

let message = `Ширина экрана: ${window.screen.width} px\nВысота экрана: ${window.screen.height} px`

const btn = document.querySelector('.btn')
btn.addEventListener('click', () => {
    window.alert(message);
})