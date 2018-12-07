const formatPokeName = (name = "") =>
  name
    .split("-")
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(" ");

export default formatPokeName;
