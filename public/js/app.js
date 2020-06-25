const messageOne = document.querySelector('#first')
const messageTwo = document.querySelector('#second')
const messageThree = document.querySelector('#third')
const icon = document.querySelector('#icon')

const fetchData = (location) => {fetch('/weather?location=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = ''
            messageThree.textContent = 'Error'
            messageTwo.textContent = data.error
        } else {
            const icon = document.createElement('img')
            icon.src = data.img
            messageOne.textContent = data.location
            messageThree.textContent = data.description + '  '
            messageThree.appendChild(icon)
            messageTwo.textContent = data.forecast
        }
    })
})
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault()

    messageOne.textContent = 'Loading'

    const location = search.value

    fetchData(location)
})