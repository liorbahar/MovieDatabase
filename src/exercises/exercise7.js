const {fromHttpRequest} = require('../utils/http');
const { filter,map,max,switchMap, mergeMap, mergeAll, find, toArray, groupBy, count } = require('rxjs/operators');
const { from } = require('rxjs');
 

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        mergeMap(movie => getMapBetweenYearAndGenres(movie)),
        filter(movie => movie.genres.includes('thriller')),
        groupBy(movie => movie.year),
        mergeMap(group => group.pipe(count(), map(movieCount => [group.key, movieCount]))),
        max((a, b) => a[1] < b[1] ? -1 : 1)
        ).subscribe(console.log);



function getMapBetweenYearAndGenres(movie){
    return from(movie.genres).pipe(
        getGenresNamesArray(),
        toArray(),
        map(genres => {
            return {
                year : parseInt(movie.year),
                genres : genres
            }
        }))
}

function getGenresNamesArray() {
    return mergeMap(genreId => {
        return fromHttpRequest(`https://orels-moviedb.herokuapp.com/genres/${genreId}`)
            .pipe(map(genre => genre.name))
    })
}
