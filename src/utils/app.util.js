const getExpiryTime = (minute) => {
  const date = new Date();
  date.setTime(date.getTime() + minute * 60 * 1000);
  return date;
};

module.exports = { getExpiryTime };
