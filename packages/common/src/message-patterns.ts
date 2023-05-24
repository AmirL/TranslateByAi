const EVENT = {
  TEXT_TRANSLATED: { event: 'textTranslated' },
};

const MESSAGE = {
  AI_TRANSLATE: { cmd: 'translate', service: 'ai' },
  USER: {
    FIND_BY_MAIL: { cmd: 'findByMail', service: 'user' },
    CREATE: { cmd: 'create', service: 'user' },
    FIND_BY_ID: { cmd: 'findById', service: 'user' },
  },
};

export { EVENT, MESSAGE };
