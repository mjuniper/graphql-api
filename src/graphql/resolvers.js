const fetch = require('node-fetch')

const agoBaseUrl = 'https://dc.mapsqa.arcgis.com/sharing/rest';

const log = url => {
  console.log(`>> ${url}`);
  return url;
};
const get = (url, ctx) => {
  log(url);
  const token = ctx.request.headers.authorization;
  if (token) {
    url = `${url}&token=${token}`;
  }
  return fetch(url)
  .then(res => res.json());
};

exports.resolvers = {
  Query: {
    surveys: (parent, args = {}, ctx) => {
      // TODO: q, num, start, sortField, sortOrder
      // TODO: really this is just a special kind of items search so we might delegate to an items query...
      console.log('\n\rGot request for surveys');
      const { groups, type, q } = args;

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

      const url = `${agoBaseUrl}/search?f=json&q=${query}`;
      return get(url, ctx)
      .then(resp => resp.results);
    },
    survey: (parent, args, ctx) => {
      console.log('\n\rGot request for survey');
      const { id } = args;
      const url = `${agoBaseUrl}/content/items/${id}?f=json`;
      return get(url, ctx);
    }
  },
    Survey: {
      formInfo: (parent, args, ctx) => {
        const { id } = parent;
        const url = `${agoBaseUrl}/content/items/${id}/info/form.json?f=json`;
        return get(url, ctx)
        .then(resp => {
          return resp.settings.openStatusInfo;
        });
      }
    }
}
