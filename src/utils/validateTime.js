export default function validateTime(time) {
  const isValid = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  return isValid.test(time);
}
