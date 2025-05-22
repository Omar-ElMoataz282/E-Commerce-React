export default function SliceText(text, txtNums) {
  return text.length > txtNums ? text.slice(0, txtNums) + "..." : text;
}
