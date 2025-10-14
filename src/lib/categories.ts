import slugify from "react-slugify";

const categories = ["Nogomet", "Košarka", "Rukomet", "Odbojka", "Ostalo"];

export const navItems = categories.map((label) => ({
  label: label,
  path: slugify(label),
}));
