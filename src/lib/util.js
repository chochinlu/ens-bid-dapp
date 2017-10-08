import moment from 'moment'

export const isValidJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

// if search params not exists return false
export const urlQueryParamsObject = (url) => {
  if (url.indexOf('?') === -1) return {empty: true};
  let urlSearchString = url.split("?")[1];
  const query = urlSearchString
    .split('&')
    .map(q => q.split('='))
    .filter(([name, value]) => name && value)
    .map(([name, value]) => {
      let obj = {};
      obj[name] = decodeURI(value);
      return obj;
    })
    .reduce((a, b) => Object.assign(a,b), {});
  return query;
}

// time formate related methods
const format = (date) => moment(date, 'dddd, MMMM D YYYY, h:mm:ss a z');
const getBefore = (time) => format(moment()).diff(format(time)) < 0;

export const getDuringReveal = (start, end) => {
  const beforeStartsAt = start && getBefore(start);
  const beforeEndsAt = end && getBefore(end);

  if (beforeStartsAt && beforeEndsAt) {
    return 'before';
  } else if (!beforeStartsAt && beforeEndsAt) {
    return 'during';
  } else {
    return 'expired';
  }
}

export const fromNow = (thisTime) => moment(thisTime).fromNow();