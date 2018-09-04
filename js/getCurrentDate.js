
export function getCurrentDate() {
  let newDate = new Date(Date.now());
  // I am increasing the month by 1 bc the months are 0-indexed which is a bit confusing
  // because the date of the month is actually NOT 0-indexed, so I think it will make more sense this way
  let month = (newDate.getMonth() +1).toString();
  if(+month < 10) month="0".concat(month);
  let date = (newDate.getDate()).toString();
  let year = (newDate.getFullYear()).toString();
  const taskDate = month.concat(date, year);
  console.log('taskDate',taskDate);
  return taskDate;
}