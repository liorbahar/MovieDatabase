const {fromHttpRequest} = require('../utils/http');
const { filter,map,switchMap } = require('rxjs/operators');
 

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(map(movies => movies.length))
    .subscribe(console.log);