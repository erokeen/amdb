//TMDB MOVIE

const API_KEY = 'api_key=b0c478b7ead1897979ba60ad21f66ad9';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_URL = 'https://www.themoviedb.org/movie/'

var MOVIES = [
  19382,
  27673,
  628632,
  21338,
  502130,
  486980,
  257935,
  57086,
  454286,
  151219,
  151207,
  520675,
  407626,
  472451,
  390396,
  28153,
  291672,
  158359,
  347126,
  105701,
  49801,
  85681,
  11465,
  26522,
  335409,
  312680,
  86209,
  65272,
  52681,
  209321,
  202143,
  26254,
  48197,
  7547,
  33557,
  149631,
  103731,
  4984,
  279866,
  92383,
  22784,
  205530,
  26408,
  31581,
  33403,
  47701,
  21128,
  152792,
  1623,
  9440,
  72856,
  21849,
  263087,
  46317,
  235519,
  17529,
  1842,
  56162,
  49855,
  12498,
  560204,
  44582,
]
var Actors = [
  1932177,
  17663,
  33262,
  44879,
  8210,
  70615,
  60196,
  177765,
  54729,
  33848,
  125306,
  50971,
  149829,
  83223,
  30510,
  125305,
  1171570,
  6164,
  2077,
  45474,
  105620,
  21563,
  59222,
  19328,
  31467,
  169920,
  129088,
  879,
]
var Actresses = [
  103078,
  107445,
  6735,
  171167,
  16484,
  133227,
  106740,
  71886,
  196123,
  1006838,
  154716,
  41249,
  1682529,
  2453,
  170652,
  1234824,
  216119,
  153410,
  79791,
  103078,
  4778,
  27539,
  1212018,
  84331,
  1043415,
  1172695,
  1412068,
  1961524,
]

var wrapper = document.getElementsByClassName('cards-wrapper-index')[0]

var movie_list = {}
function fetch_data(id) {
    var url = `${BASE_URL}/movie/${id}?${API_KEY}`
    var page = `${MOVIE_URL}${id}`
    window.fetch(url).then(response => response.json())
    .then(function(data) {
        var title = data.title
        var poster_path = data.poster_path
        if (poster_path) {
            poster_path = `${IMG_URL}${poster_path}`
        } else {
            poster_path = "img/unavailable.jpg"
        }
        var overview = data.overview
        var rating = data.vote_average
        
        var movie = document.createElement('div')
        movie.setAttribute('class', 'movie')
        
        var img = document.createElement('img')
        img.setAttribute('src', poster_path)
        img.setAttribute('alt', 'image')
        movie.appendChild(img)
        
        var movie_info = document.createElement('div')
        movie_info.setAttribute('class', 'movie-info')
        movie.appendChild(movie_info)
        
        var h3 = document.createElement('h3')
        h3.innerHTML = title
        movie_info.appendChild(h3)
    
        var span = document.createElement('span')
        span.setAttribute('class', 'green')
        span.innerHTML = rating
        movie_info.appendChild(span)
        
        var overview_el = document.createElement('div')
        overview_el.setAttribute('class','overview')
        
        var h3 = document.createElement('h3')
        h3.innerHTML = 'Overview'
        overview_el.appendChild(h3)
        
        overview_el.innerHTML += overview
        movie.appendChild(overview_el)
        
        var h5 = document.createElement('h5')
        overview_el.appendChild(h5)
        
        var a = document.createElement('a')
        a.setAttribute('href', `${MOVIE_URL}${id}` )
        a.innerHTML = 'Click here to visit this movie page on TMDB'
        h5.appendChild(a)
        
        
        movie_list[title] = movie
        
    })
}



MOVIES.forEach(function(id) {
    fetch_data(id)
})

!function check() {
    if (Object.keys(movie_list).length != MOVIES.length) {
        setTimeout(check, 50)
    } else {
        window.keys = Object.keys(movie_list)
        window.letters = {}
        keys = keys.sort()
        keys.forEach(function(e) {
            letters[e[0]] = 1
            console.log(movie_list[e])
            wrapper.appendChild(movie_list[e])
        })
        letters['All'] = 1
        
        var jumbotron = document.getElementsByClassName('jumbotron')[0]
        
        Object.keys(letters).forEach(function(letter) {
            var button = document.createElement('button')
            button.setAttribute('class', 'filtering')
            button.setAttribute('letter', letter)
            button.setAttribute('onclick', `filter('${letter}')`)
            button.innerHTML = letter
            jumbotron.appendChild(button)
        })
        
    }
}()

function filter(letter) {
    wrapper.innerHTML = ''
    keys.forEach(function(movie) {
        if (movie[0] == letter || letter == 'All') {
            wrapper.appendChild(
                movie_list[movie]
            )
        }
    })
}



