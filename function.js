/**
 * Created by unaisainz on 15/3/17.
 */
const schedule = require('node-schedule');
const getNewsJob = schedule.scheduleJob('*/1 * * * *', function(){
    getNewsFromBerria();
    console.log("new added");
});



function getNewsFromBerria() {
    async.eachLimit(types, 1, function(type, next){
        const req = request('http://www.berria.eus/rss/' + type + '.xml');
        const feedparser = new FeedParser();

        req.on('error', function(err){

        }).on('response', function (res) {
            const stream = this; // `this` is `req`, which is a stream

            if (res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code'));
            }
            else {
                stream.pipe(feedparser);
            }
        }).on('error', function (error) {
            // always handle errors
        }).on('meta', function (meta) {
            console.log('===== %s =====', meta.title);
        }).on('readable', function () {
            // This is where the action is!
            let stream = this, item;
            while (item = stream.read()) {
                console.log('Got article: %s', item.title || item.description);
            }
        });
    }, function(err){
        if(err) return log.error(err);
    });
}