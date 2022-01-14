const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const totalAmtToBePaid = (investedAmount) => {
  return investedAmount;
};

const getReturnAmount = (investedAmount, stakeAmount) => {
  return investedAmount * stakeAmount;
};

module.exports = {
  randomNumber,
  totalAmtToBePaid,
  getReturnAmount,
};
