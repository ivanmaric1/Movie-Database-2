function spremiPodatke() {
    let name = document.querySelector('.movie__title').value
    let extraName = document.querySelector('.movie__extra--name').value
    let extraValue = document.querySelector('.movie__extra--value').value
    let newMovie = {info : { name, [extraName] : extraValue},
                    id : Math.random()
    }
    let movies = []

    document.querySelector('.output__list').innerHTML = ''

    if(localStorage.getItem('movies') === null) {
        movies.push(newMovie)
        localStorage.setItem('movies', JSON.stringify(movies))
    } else {
        movies =  JSON.parse(localStorage.getItem('movies'))
        movies.push(newMovie)
        localStorage.setItem('movies', JSON.stringify(movies))
    }
    prikažiFilmove()
}

function prikažiFilmove(filter) {
    if(localStorage.getItem('movies') !== null) {
        let movies = JSON.parse(localStorage.getItem('movies'))
        let filtered = movies.filter(r => r.info.name.includes(filter))

        filtered.forEach((item) => {
            let newElement = document.createElement('li')
            let text = ` - `
            for(let key in item.info) {
                if(key !== 'name') {
                    text += `${key} : ${item.info[key]}`
                }
            }
            newElement.innerHTML = `
            <div class='output__item'>
                <div class='info'>
                     <p class='movie__name'>${item.info.name}</p> 
                     <p>${text}<p> 
                </div>
               <a href='#' class='delete'>X</a>
            </div>
            `
            document.querySelector('.output__list').appendChild(newElement);
        })
    } 
}

function brišiFilm(e) {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
        let elementForDelete = e.target.parentElement.firstElementChild.firstElementChild.innerHTML
        let movies = JSON.parse(localStorage.getItem('movies'))
        console.log(elementForDelete)
        console.log(movies)

        movies.forEach((item,index) => {
            if(elementForDelete === item.info.name) {
                movies.splice(index, 1)
            }
        })
        localStorage.setItem('movies', JSON.stringify(movies))
    }
}

function filtriraj() {
    let filter = document.querySelector('.search__input').value
    document.querySelector('.output__list').innerHTML = ''
    prikažiFilmove(filter)
}






// Event - spremanje filma
document.querySelector('.btn--entry').addEventListener('click', spremiPodatke)
// Prikaz filmova
document.addEventListener('DOMContentLoaded', prikažiFilmove(''))
// Brisanje filma
document.querySelector('.output__list').addEventListener('click', brišiFilm)
// Filtriranje
document.querySelector('.btn--search').addEventListener('click', filtriraj)
