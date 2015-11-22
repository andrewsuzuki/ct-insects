var osmosis = require('osmosis');

// Split based on ; and , separation, then trim results
var smartSplit = function(value) {
  return value.split(new RegExp('[;,]', 'g'))
  .map(function(str) {
    return str.trim();
  })
  .filter(function(str) {
    return str.length;
  });
};

module.exports = function(cb) {
  var bugs = [];
  var keywords = {};

  return osmosis
  .get('http://www.insectidentification.org/insects-by-state.asp?thisState=Connecticut')
  .find('#recordsetTextHolder span a')
  .set('name')
  .follow('@href')
  .find('#content-right > p:first > span:first')
  .set('about')
  .find('#content-right > span.textMedium1:nth-of-type(1)')
  .set('catname')
  .find('#content-right > span.textMedium1:nth-of-type(2)')
  .set({
    p1: 'p:nth-of-type(1)',
    p2: 'p:nth-of-type(2)',
    p3: 'p:nth-of-type(3)',
    p4: 'p:nth-of-type(4)',
  })
  .data(function(listing) {
    bug = {
      name: listing.name,
      about: listing.about,
    };

    var f1 = listing.catname.split(new RegExp('[\n]', 'g')).map(function(str) {
      return str.trim();
    });

    [listing.p1, listing.p2, listing.p3, listing.p4].concat(f1).forEach(function(line) {
      if (typeof line === 'string' || line instanceof String) {
        line = line.trim();
        if (line.indexOf(':') > -1) {
          var value = line.substring(line.indexOf(':') + 1).trim();

          switch (line.substring(0, line.indexOf(':'))) {
            // First area
            case 'Category':
              bug.category = value;
              break;
            case 'Common name':
              bug.common_name = value;
              break;
            case 'Scientific Name':
              bug.scientific_name = value;
              break;
            case 'Other Names':
              bug.other_names = value;
              break;

            // Second area
            case 'Adult Size (Length)':
              bug.adult_size = value.split('\n')[0].trim();
              break;
            case 'Identifying Colors':
              bug.colors = smartSplit(value);
              break;
            case 'General Description':
              var kws = smartSplit(value);
              bug.keywords = kws;

              // Keep track of total keyword counts
              kws.forEach(function(kw) {
                if (keywords.hasOwnProperty(kw)) {
                  keywords[kw] += 1;
                } else {
                  keywords[kw] = 1;
                }
              });

              break;
            case 'North American Reach (Though Not Limited To*)':
              bug.reach = smartSplit(value);
              break;
          }
        }
      }
    });

    bugs.push(bug);
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log)
  .done(function() {
    cb({
      keywords: keywords,
      bugs: bugs
    });
  });
};
