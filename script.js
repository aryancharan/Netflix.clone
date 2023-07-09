const Apikey ="d1de7752d7e2f3dd848fad1ccf311d16"
const apiendpoint ="https://api.themoviedb.org/3"
const imgpath  = "https://image.tmdb.org/t/p/original";

const apipaths = {
    fetchallcategories: `${apiendpoint}/genre/movie/list?api_key=${Apikey}`,
    fetchmovieslist: (id) => `${apiendpoint}/discover/movie?api_key=${Apikey}&with_genres=${id}`
}

//boots up the app
function  init(){
  fetchandbulidallsections();
}

function fetchandbulidallsections(){
   fetch(apipaths.fetchallcategories)
   .then(res=>res.json())
   .then(res => {
    const categories = res.genres;
    if(Array.isArray(categories) && categories.length){

        categories.forEach(categories =>{
            fetchandbulidmoviesections(apipaths.fetchmovieslist(categories.id),categories);
        });
    }
    
   })
   .catch(err =>console.error(err));

}
function fetchandbulidmoviesections(fetchurl,categories){
    console.log(fetchurl,categories);
    fetch(fetchurl)
    .then(res => res.json())
    .then(res =>{
        console.log(res.results)
        const movies = res.results;
    if(Array.isArray(movies) && movies.length){
        buildmoviessection(movies,categories.name);
    }})
    .catch(err=>console.error(err))
}
function buildmoviessection(list,catagoryname){
    console.log(list,catagoryname)

    const moviescont = document.getElementById("moviescont");
  const movieslisthtml =  list.map(item =>{
        return`
        <div>
        <img src="${imgpath}${item.backdrop_path}" alt="${item.title}" class="movieitem">
        </div>
        `;
    }).join('');
    const moviesectionhtml =`
        <h2 class="moviesectionheading">${catagoryname}<span class="explorenudge"></span></h2>
        <div class="moviesrow">
            ${movieslisthtml}
        </div>
   `
    //console.log(moviesectionhtml)
   
    const div = document.createElement('div');
    div.className = "moviesssection";
    div.innerHTML = moviesectionhtml;

    moviescont.append(div);
}
window.addEventListener('load',function(){
    init();
})