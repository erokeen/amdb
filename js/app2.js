//TMDB ACTRESS

const API_KEY = 'api_key=b0c478b7ead1897979ba60ad21f66ad9';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_URL = 'https://api.themoviedb.org/3';

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

var wrapper = document.getElementsByClassName('cards-wrapper-index3')[0]

var actress_list={}
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
        
        var actress = document.createElement('div')
        actress.setAttribute('class', 'actress')
        
        var img = document.createElement(`img`)
        img.setAttribute('src', profile_path)
        img.setAttribute('alt', 'image')
        actress.appendChild(img)
        
        var actress_info = document.createElement('div')
        actress_info.setAttribute('class', 'actress-info')
        actress.appendChild(actress_info)
        
        var h3 = document.createElement('h3')
        h3.innerHTML = name
        actress_info.appendChild(h3)
        
        var span = document.createElement('span')
        span.setAttribute('class', 'green')
        span.innerHTML = popularity
        actress_info.appendChild(span)
        
        var biography_el = document.createElement('div')
        biography_el.setAttribute('class', 'biography')
        
        var h3 = document.createElement('h3')
        h3.innerHTML = 'Biography'
        biography_el.appendChild(h3)
        
        biography_el.innerHTML += biography
        actress.appendChild(biography_el)
        
        var h4 = document.createElement('h4')
        h4.innerHTML = 'Place of Birth'
        biography_el.appendChild(h4)
        
        biography_el.innerHTML += place_of_birth
        actress.appendChild(biography_el)
        
        var h5 = document.createElement('h5')
        h5.innerHTML = 'Birthday'
        biography_el.appendChild(h5)
        
        biography_el.innerHTML += birthday
        actress.appendChild(biography_el)
        
        actress_list[name] = actress
        
    })
}

Actresses.forEach(function(id) {
    fetch_data(id)
})

!function check() {
    if (Object.keys(actress_list).length != Actresses.length) {
        setTimeout(check, 50)
    } else {
        window.keys = Object.keys(actress_list)
        window.letters = {}
        keys = keys.sort()
        keys.forEach(function(e) {
            letters[e[0]] = 1
            console.log(actress_list[e])
            wrapper.appendChild(actress_list[e])
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
    keys.forEach(function(actress) {
        if (actress[0] == letter || letter == 'All') {
            wrapper.appendChild(
                actress_list[actress]
            )
        }
    })
}