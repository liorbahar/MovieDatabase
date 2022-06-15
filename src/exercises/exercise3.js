const {fromHttpRequest} = require('../utils/http');
const { map, flatMap,toArray, mergeAll, mergeMap, filter } = require('rxjs/operators');
const { from } = require('rxjs');
 

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeMap(directors => 
            from(directors).pipe(
                map(director => director.name),
                filter(director => {
                    const directorName = director.toLowerCase();
                    return directorName[0] === directorName[directorName.length - 1];    
                })
            )
        )
     )
    .subscribe(console.log);