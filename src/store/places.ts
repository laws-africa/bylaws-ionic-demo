export interface Place {
  name: string;
  id: string;
  works: string[];
}

export const PLACES: Place[] = [];

// load places
fetch('/places.json').then(resp => {
  resp.json().then(places => {
    (places as Place[]).forEach(p => PLACES.push(p));
    PLACES.sort((a, b) => a.name.localeCompare(b.name));
  });
});

export function getPlace(id: string): Place | null {
  const place = PLACES.find(p => p.id === id);
  return place ? place : null;
}
