const baseurl = 'https://pokeapi.co/api/v2/pokemon'
var offset = 0 
var state = 1118/20;



function getData(url ,  query ,cb){
    fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(r => cb(r))
}


getData(baseurl , `offset=${offset}&limit=20` , res =>{
    console.log(res.results);
    const card = res.results.map(item => Card(item)).join("")
    container.innerHTML = card
})

const container = document.querySelector('.row')

function Card(item){
    return`
        <div class="card">
            <div class="card_content">
                <h2>${item.name}</h2>
                <hr>
                <p>Узнать подробнее о персонаже</p>
                <button class="more" onclick="More('${item.url}')">More</button>
            </div>
        </div>
    `
}

function More(url){
    console.log(url);

    getData(url , '' , res =>{
        console.log(res.sprites.back_default)
        container.innerHTML = `
            <div class="card2">
                <div class="card2_content">
                    <img src="${res.sprites.front_default}">
                    <div class="info">
                        <p>Experience:${res.base_experience}</p>
                        <p>Height:${res.height}</p>
                        <p>Weight:${res.weight}</p>
                    </div>
                </div>
            </div>
        `
    })
    
}





const prev = document.querySelector('.prev')
const count = document.querySelector('.count')
const next = document.querySelector('.next')

var pagination = 1

// if(pagination <= 0){
//     prev.addEventListener('click' , e =>{
//         preventDefault()
//     })
// }

prev.addEventListener('click' , e =>{
    e.preventDefault()
    
   

    if(pagination > 0){
        offset -=20
        pagination--
    }


    count.innerHTML = pagination

    getData(baseurl, `offset=${offset}&limit=20` , res =>{
        const card = res.results.map(item => Card(item)).join("")
        container.innerHTML = card
    })

    if(pagination < 0){
        prev.classList.add('disabled')
    } else if(pagination < state){
        next.classList.remove('disabled')
    }

    
})

next.addEventListener('click' ,e =>{
    e.preventDefault()

    offset +=20
    pagination++

    count.innerHTML = pagination

    getData(baseurl, `offset=${offset}&limit=20` , res =>{
        const card = res.results.map(item => Card(item)).join("")
        container.innerHTML = card
    })

    if(pagination > state){
        next.classList.add('disabled')
    }

    if(pagination < 0){
        prev.classList.remove('disabled')
    }
})