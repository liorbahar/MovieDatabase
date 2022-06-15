const {fromHttpRequest} = require('../utils/http');
const { filter,flatMap,map,max,switchMap, mergeMap, mergeAll, find, toArray, groupBy, count } = require('rxjs/operators');
const { from, concat } = require('rxjs');
 
function getAllMovies(){
    return  fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        map(movies => movies)
    )
}

function getDirectors(){return fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
.pipe(
    map(directors => directors)
)}

function getGenres(){return fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')
.pipe(
    map(genres => genres)
) } 


concat(getAllMovies(),getDirectors(),getGenres()).subscribe(console.log);