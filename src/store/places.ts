export interface Place {
  name: string;
  id: string;
  works: string[];
}

export const PLACES: Place[] = [{
  'name': 'Cape Town',
  'id': 'za-cpt',
  'works': ['w', 'b']
}, {
  'name': 'Johannesburg',
  'id': 'za-jhb',
  'works': ['c', 'd']
}];
PLACES.sort((a, b) => a.name.localeCompare(b.name));

export function getPlace(id: string): Place | null {
  const place = PLACES.find(p => p.id === id);
  return place ? place : null;
}
