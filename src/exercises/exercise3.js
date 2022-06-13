const {fromHttpRequest} = require('../utils/http');
const { filter,map,switchMap } = require('rxjs/operators');
 

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        map(directors => directors.map(director => director.name)),
        map(directors => directors.filter(director => {
                const directorName = director.toLowerCase();
                return directorName[0] === directorName[directorName.length - 1];    
            })
     ))
    .subscribe(console.log);