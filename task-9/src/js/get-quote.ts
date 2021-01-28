const blockquote: HTMLElement = document.querySelector('blockquote');
const figcaption: HTMLElement = document.querySelector('figcaption');
const btn: HTMLElement = document.querySelector('.quote__btn');

async function getQuote(): Promise<any> {
    try {
        const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
        const res = await fetch(url);
        const data = await res.json();
        renderQuote(data)
    } catch (e) {
        blockquote.textContent = `Error! ${e}`;
    }
}

function renderQuote(data) {
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}


document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);