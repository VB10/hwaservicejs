const queryParam = function getQueryParam(val) {
  if (val != null && val != "") {
    return val;
  } else {
    return "";
  }
};

const queryLimit = function getQueryLimit(val) {
  if (val != null && val > 0) {
    return val;
  } else {
    return 0;
  }
};

module.exports = { queryParam, queryLimit };
