const KEY = "mys_favs";

export function getFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: number): boolean {
  const set = new Set(getFavorites());
  if (set.has(id)) set.delete(id);
  else set.add(id);
  const arr = Array.from(set);
  localStorage.setItem(KEY, JSON.stringify(arr));
  return set.has(id);
}
