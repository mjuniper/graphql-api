const fetch = require('node-fetch')

const token = '6vhcoqwWPfFBkUvgxeRi1k0lkRNnXYrEizeKnrdqBrKIf8Ifvzq54im1DeHItzpmKTuun5PIGrSqJlH_AMC4LgxSz7h9bJC0TqosJ1ghFfmdTRu60ZIzm1BhrGrFMkDHqv2y3zHflo8mncw1KIX6Qeq8eOSNg70lb-0PH5QZTQmu7csoQtbZtvefEXhoQaY_D0_19FfW6cNCJl9dHE4viA..';
const agoBaseUrl = 'https://dc.mapsqa.arcgis.com/sharing/rest';

const log = url => {
  console.log(`>> ${url}`);
  return url;
};
const get = url => {
  log(url);
  return fetch(url)
  .then(res => res.json());
};

exports.resolvers = {
  Query: {
    surveys: (parent, args = {}) => {
      // TODO: q, num, start, sortField, sortOrder
      // TODO: really this is just a special kind of items search so we might delegate to an items query...
      const { groups, type, q } = args;
      // console.log(groups);

      const qParts = [
        'type:Form',
        '-typekeywords:"Survey123 Connect"'
      ];

      if (type) {
        // we are using type here for draft | published
        const typeQ = (type === 'published') ? '-typekeywords:Draft' : 'typekeywords:Draft';
        qParts.push(typeQ);
      }

      if (q) { qParts.push(q); }
      if (groups) {
        const groupQ = groups.map(g => `group:${g}`).join(' OR ');
        qParts.push(`(${groupQ})`);
      }

      const query = qParts.join(' AND ');

      const url = `${agoBaseUrl}/search?f=json&q=${query}&token=${token}`;
      return get(url)
      .then(resp => resp.results);
    },
    survey: (parent, args) => {
      const { id } = args;
      const url = `${agoBaseUrl}/content/items/${id}?f=json&token=${token}`;
      return get(url);
    },
  }
}
