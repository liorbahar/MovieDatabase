const {fromHttpRequest} = require('../utils/http');
const { map } = require('rxjs/operators');
 

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(map(array => array[0]))
    .subscribe(console.log);