import { Place } from './places';

export interface TocItem {
  title: string;
  id: string;
  children?: TocItem[];
}

export interface Work {
  id: string;
  title: string;
  frbr_uri: string;
  repealed: boolean;
  stub: boolean;
  content: string;
  toc: TocItem[];
}

export const WORKS: Work[] = [];

// load works
const loading = new Promise((resolve) => {
  fetch('/works.json').then(resp => {
    resp.json().then(works => {
      (works as Work[]).forEach(w => {
        w.id = w.frbr_uri.replace(/\//g, '-');
        WORKS.push(w);
      });
      resolve();
    });
  });
});

export function getPlaceWorks(place: Place): Work[] {
  return WORKS.filter(w => place.works.includes(w.frbr_uri));
}

export function getWork(id: string): Work | null {
  const work = WORKS.find(w => w.id === id);
  return work ? work : null;
}

export function fetchPlaceWorks(place: Place): Promise<Work[] | null> {
  return new Promise<Work[] | null>((resolve) => {
    loading.then(() => resolve(getPlaceWorks(place)));
  });
}
