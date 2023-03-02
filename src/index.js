document.addEventListener("DOMContentLoaded", () => {
    fetch(' http://localhost:3000/quotes?_embed=likes')
    .then(response => response.json())
    .then(data => data.forEach(quote => favoriteQuotes(quote)))
})

function favoriteQuotes(quote) {
    const quoteList = document.getElementById("quote-list")

    const listItemQuote = document.createElement('li')
    listItemQuote.classList.add('quote-card')

    const blockQuote = document.createElement('blockquote')
    blockQuote.classList.add('blockquote')

    const quoteText = document.createElement('p')
    quoteText.classList.add('mb-0')
    quoteText.innerText = quote.quote

    const quoteAuthor = document.createElement('footer')
    quoteAuthor.classList.add('blockquote-footer')
    quoteAuthor.innerText = quote.author 

    const likeButton = document.createElement('button')
    likeButton.classList.add('btn-success')
    let count = 0;
    likeButton.innerText = `Likes: ${count}`;

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn-danger')
    deleteButton.innerText = 'Delete'

    blockQuote.append(quoteText, quoteAuthor, likeButton, deleteButton)
    listItemQuote.appendChild(blockQuote)
    quoteList.append(listItemQuote)

    likeButton.addEventListener('click', () => {
        count += 1;
        likeButton.innerText = "Likes: " + count
    })

    deleteButton.addEventListener('click', () => {
        listItemQuote.remove()
    })
}

const form = document.getElementById('new-quote-form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newFormObj = {
        quote: document.getElementById('new-quote').value, 
        author: document.getElementById('author').value
    }

    favoriteQuotes(newFormObj)
    form.reset()

})