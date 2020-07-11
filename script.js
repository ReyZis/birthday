const birthday = document.getElementById('birthday');
const submit = document.getElementById('submit');

submit.addEventListener("click", changeUI);

/**
 * 
 * @param {Event} event 
 */
function changeUI(event) {
    event.preventDefault()

    document.getElementById('result-container').innerHTML = '';

    const date = birthday.value;
    let year = parseInt(date.slice(0, 4));
    let month = parseInt(date.slice(5, 7));
    if (month === 1 || month === 2) {
        month += 12;
        year--;
    }
    const day = parseInt(date.slice(8, 10));
    console.log(date, year, month, day);

    const today = new Date();

    for (let index = year; index < today.getFullYear(); index++) {
        const birthday = calculateDay(day, month, index % 100, Math.floor(index / 100));
        if (month === 13 || month === 14) {
            var result = makeResultDiv(index + 1, birthday);
        } else {
            result = makeResultDiv(index, birthday);
        };
        document.getElementById('result-container').appendChild(result);
    }
}

function makeResultDiv(year, day) {
    const container = makeDiv("d-flex justify-content-around align-items-center mb-5");

    const yearResult = makeResult(year, true)

    const dayResult = makeResult(day, false)

    container.appendChild(yearResult);
    container.appendChild(dayResult);
    return container;
}

function makeResult(text, isYear) {
    const Div = makeDiv("d-flex justify-content-center py-2 align-items-center result-theme theme");
    var TextNode;
    if (isYear) {
        TextNode = document.createTextNode(`Year: ${text}`);
    } else {
        TextNode = document.createTextNode(`Your birthday was in: ${text}`);
    }
    Div.appendChild(TextNode);
    return Div;
}

function makeDiv(attribute) {
    const div = document.createElement('div');
    div.setAttribute('class', attribute);
    return div;
}

function calculateDay(q, m, k, j) {
    const days_of_the_week = ["Saturday", "Sunday", "Monday", "tuesday", "Wednesday", "Thursday", "friday"];

    const b = Math.floor(13 * (m + 1) / 5);
    const d = Math.floor(k / 4);
    const e = Math.floor(j / 4);

    const h = (q + b + k + d + e + (5 * j)) % 7;

    const birthday = days_of_the_week[h];
    return birthday;
}