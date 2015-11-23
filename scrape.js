var osmosis = require('osmosis');

// Split based on ; and , separation, then trim results
var smartSplit = function(value) {
  return value.split(new RegExp('[;,]', 'g'))
  .map(function(str) {
    return str.trim();
  })
  .filter(function(str) {
    return str.length > 1;
  });
};

module.exports = function(cb) {
  var insects = [];

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
    insect = {
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
              insect.category = value;
              break;
            case 'Common name':
              insect.common_name = value;
              break;
            case 'Scientific Name':
              insect.scientific_name = value;
              break;
            case 'Other Names':
              insect.other_names = value;
              break;

            // Second area
            case 'Adult Size (Length)':
              // split xxmm to yymm
              const mm = value.split('\n')[0].trim().split(' to ');
              if (mm.length === 2) {
                // remove mm
                // note: can't map to parseInt directly due to radix arg :(
                insect.adult_size = mm.map(value => parseInt(value));
              } else {
                insect.adult_size = [0, 0];
              }
              break;
            case 'Identifying Colors':
              insect.colors = smartSplit(value);
              break;
            case 'General Description':
              insect.keywords = smartSplit(value);
              break;
            case 'North American Reach (Though Not Limited To*)':
              insect.reach = smartSplit(value);
              break;
          }
        }
      }
    });

    insects.push(insect);
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log)
  .done(function() {
    cb({ insects: insects });
  });
};
