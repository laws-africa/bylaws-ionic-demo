import { Place } from './places';

export interface TocItem {
  title: string;
  id: string;
  children?: TocItem[];
}

export interface Work {
  title: string;
  frbrUri: string;
  content: string;
  toc: TocItem[];
}

export const WORKS: Work[] = [{
  'title': 'Water',
  'frbrUri': 'w',
  'toc': [{
    'title': 'Section 1',
    'id': 'sec_1',
  }, {
    'title': 'Section 2',
    'id': 'sec_2',
  }],
  'content': 'some <b>html</b>'
}, {
  'title': 'Refuse',
  'frbrUri': 'b',
  'toc': [{
    'title': 'Chapter 1',
    'id': 'chp_1',
    'children': [{
      'title': 'Section 1',
      'id': 'sec_1',
    }, {
      'title': 'Section 2',
      'id': 'sec_2',
    }]
  }],
  'content': 'some <b>more html</b>'
}];

export function getPlaceWorks(place: Place): Work[] {
  return WORKS.filter(w => place.works.includes(w.frbrUri));
}

export function getWork(frbrUri: string): Work | null {
  const work = WORKS.find(w => w.frbrUri === frbrUri);
  return work ? work : null;
}
