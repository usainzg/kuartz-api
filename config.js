'use strict';

//noinspection JSAnnotator
module.exports = {
    name: 'kuartz-api',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri: 'mongodb://localhost:27017/kuartz-api-db'
    }
};