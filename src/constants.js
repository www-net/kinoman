const EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const AGE_RATINGS = {
  '0+': `General audiences`,
  '6+': `Parental guidance`,
  '12+': `Parents strongly cautioned`,
  '16+': `Restricted`,
  '18+': `No One 17 & Under Admitted`,
};

const USER_STATUSES = [
  {
    min: 21,
    name: `Movie buff`
  },
  {
    min: 11,
    name: `Fan`,
  },
  {
    min: 1,
    name: `Novice`,
  },
];

const MAX_CARDS_TOP = 2;
const MAX_CARDS_SHOW = 5;
const MAX_CARDS_LOAD = 5;

export {
  EMOJI,
  AGE_RATINGS,
  USER_STATUSES,
  MAX_CARDS_TOP,
  MAX_CARDS_SHOW,
  MAX_CARDS_LOAD
};
