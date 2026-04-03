import { useState } from "react";

const ADJECTIVES = ["Blue", "Silver", "Red", "Golden", "Shadow", "Crimson", "Jade", "Amber", "Cobalt", "Iron"];
const ANIMALS = ["Falcon", "Owl", "Wolf", "Hawk", "Lynx", "Fox", "Raven", "Tiger", "Panda", "Eagle"];

function generateAlias(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adj} ${animal}`;
}

export function useAlias() {
  const [alias] = useState<string>(() => {
    const stored = localStorage.getItem("safespace_alias");
    if (stored) return stored;
    const newAlias = generateAlias();
    localStorage.setItem("safespace_alias", newAlias);
    return newAlias;
  });

  return alias;
}
