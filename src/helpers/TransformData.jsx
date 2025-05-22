function TransformData(date) {
  const selectDate = new Date(date);
  const getYear = selectDate.getFullYear();
  const getMoth = (selectDate.getMonth() + 1).toString().padStart(2, "0");
  const getDay = selectDate.getDate().toString().padStart(2, "0");

  return `${getYear}-${getMoth}-${getDay}`;
}

export default TransformData;
