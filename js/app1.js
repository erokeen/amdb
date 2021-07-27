//TMDB ACTOR

const API_KEY = 'api_key=b0c478b7ead1897979ba60ad21f66ad9';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_URL = 'https://api.themoviedb.org/3';
const PERSON_URL = 'https://www.themoviedb.org/person/'

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

var wrapper = document.getElementsByClassName('cards-wrapper-index2')[0]

var actor_list={}
function fetch_data(id){
    var url=`${BASE_URL}/person/${id}?${API_KEY}`
    window.fetch(url).then(response => response.json())
    .then(function(data) {
        var name = data.name
        var profile_path = data.profile_path
        if (profile_path) {
            profile_path = `${IMG_URL}${profile_path}`
        } else {
            profile_path = "img/unavailable.jpg"
        }
        var biography = data.biography
        var place_of_birth = data.place_of_birth
        var popularity = data.popularity
        var birthday = data.birthday
        
        var actor = document.createElement('div')
        actor.setAttribute('class', 'actor')
        
        var img = document.createElement(`img`)
        img.setAttribute('src', profile_path)
        img.setAttribute('alt', 'image')
        actor.appendChild(img)
        
        var actor_info = document.createElement('div')
        actor_info.setAttribute('class', 'actor-info')
        actor.appendChild(actor_info)
        
        var h3 = document.createElement('h3')
        h3.innerHTML = name
        actor_info.appendChild(h3)
        
        var span = document.createElement('span')
        span.setAttribute('class', 'green')
        span.innerHTML = popularity
        actor_info.appendChild(span)
        
        var biography_el = document.createElement('div')
        biography_el.setAttribute('class', 'biography')
        
        var h3 = document.createElement('h3')
        h3.innerHTML = 'Biography'
        biography_el.appendChild(h3)
        
        biography_el.innerHTML += biography
        actor.appendChild(biography_el)
        
        var h4 = document.createElement('h4')
        h4.innerHTML = 'Place of Birth'
        biography_el.appendChild(h4)
        
        biography_el.innerHTML += place_of_birth
        actor.appendChild(biography_el)
        
        var h5 = document.createElement('h5')
        h5.innerHTML = 'Birthday'
        biography_el.appendChild(h5)
        
        biography_el.innerHTML += birthday
        actor.appendChild(biography_el)
        
        var h5 = document.createElement('h5')
        biography_el.appendChild(h5)
        
        var a = document.createElement('a')
        a.setAttribute('href', `${PERSON_URL}${id}` )
        a.innerHTML = 'Click here to visit this movie page on TMDB'
        h5.appendChild(a)
        
        actor_list[name] = actor
        
    })
}

Actors.forEach(function(id) {
    fetch_data(id)
})

!function check() {
    if (Object.keys(actor_list).length != Actors.length) {
        setTimeout(check, 50)
    } else {
        window.keys = Object.keys(actor_list)
        window.letters = {}
        keys = keys.sort()
        keys.forEach(function(e) {
            letters[e[0]] = 1
            console.log(actor_list[e])
            wrapper.appendChild(actor_list[e])
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
    keys.forEach(function(actor) {
        if (actor[0] == letter || letter == 'All') {
            wrapper.appendChild(
                actor_list[actor]
            )
        }
    })
}