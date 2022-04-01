export const convertTimeStamp = (data) => {
  console.log(data);
  const date = new Date(data * 1000).toLocaleDateString("en-US");
  const newDate = new Date(date);

  return `${newDate.getFullYear()}-${
    newDate.getMonth().toString().length == 1
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1
  }-${
    newDate.getDate().toString().length == 1
      ? `0${newDate.getDate()}`
      : newDate.getDate()
  }`;
};
