import consts from './consts';
const axios = require('axios').default;

async function getApi(filter, page) {
  return await axios.get(
    `${consts.MAIN_HOST}?key=${consts.API_KEY}&q=${rebuildFilter(
      filter
    )}&page=${page}${consts.MORE_FILTER}`
  );
}

function rebuildFilter(filter) {
  return filter.split(' ').join('+');
}

export default { getApi };
