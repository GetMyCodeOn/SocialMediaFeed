var Twit = require('twit'),
    fs = require('fs'),
    keys = require('./keystore.js');

var T = new Twit(keys);

var withMedia = function(item){
  if (item.text.substring(0,2) != "RT") {
    return item.entities.media;
  }
};

var newOrder = function(item){
  return {
    name: item.user.name,
    text: item.text,
    img: item.entities.media[0].media_url,
    data: item.created_at,
    location: item.user.location
  }
};

module.exports = function (search_name, callback) {
  T.get('search/tweets', { q: '"' + search_name + '"' }, 

function(err, data, response) {
    if (err) {
      callback(err, null);
    } else {
      var jsonData = { statuses: data.statuses
                                 .filter(withMedia)
                                 .map(newOrder)};
    
      var storeName = 'data.json';
    
    fs.writeFile(storeName, JSON.stringify(jsonData, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + storeName);
      }
      callback(null, "Process completed...")
    });
    };
 });
};