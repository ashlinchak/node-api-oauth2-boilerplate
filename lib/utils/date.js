'use strict';

exports.isExpired = function (initialDate, expiresInSeconds) {
  if (initialDate instanceof Date) {
    var dateInMilliseconds = initialDate.getTime() + expiresInSeconds * 1000;
    return dateInMilliseconds < new Date().getTime();
  } else {
    return false;
  }
};
