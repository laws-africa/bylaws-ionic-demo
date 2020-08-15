#!/usr/bin/env python
import json
import logging
import os
import sys
import argparse

import requests

# setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)8s %(message)s')
log = logging.getLogger(__name__)

TIMEOUT = 30

# Indigo's API configuration
INDIGO_URL = 'https://api.laws.africa/v2'
INDIGO_AUTH_TOKEN = os.environ.get('INDIGO_API_AUTH_TOKEN')
if not INDIGO_AUTH_TOKEN:
    log.error("INDIGO_AUTH_TOKEN environment variable is not set.")
    sys.exit(1)


class Updater:
    indigo = requests.Session()
    indigo.headers['Authorization'] = 'Token ' + INDIGO_AUTH_TOKEN

    def update_content(self, place_codes):
        """ Write the place index and work detail pages for all places.
        """
        self.works = []

        with open("public/places.json", "r") as f:
            places = json.load(f)

        for place in places:
            self.process_place(place)

        with open("public/places.json", "w") as f:
            json.dump(places, f, indent=2, sort_keys=True)

        with open("public/works.json", "w") as f:
            json.dump(self.works, f, indent=2, sort_keys=True)

        log.info("Done, bye")

    def process_place(self, place):
        """ Fetch the works for this place.
        """
        works = self.list_works(place)
        log.info(f"Got {len(works)} works for {place['id']}")
        place['works'] = [w['frbr_uri'] for w in works]
        self.works.extend(works)

    def list_works(self, place):
        log.info(f"Loading {place['id']} works from Indigo at {INDIGO_URL}")
        works = []

        # walk through everything published on indigo
        url = f"/akn/{place['id']}/.json"
        while url:
            resp = self.indigo.get(INDIGO_URL + url, timeout=TIMEOUT)
            resp.raise_for_status()
            data = resp.json()
            works.extend(data['results'])
            url = data['next']

        # only work with commenced works
        works = [w for w in works if w['commenced']]

        # slight tweaks to make templates easier
        for w in works:
            self.process_work(w)

        return works

    def process_work(self, work):
        log.info(f"Processing {work['frbr_uri']}")

        # strip some info
        KEEP = """
            amendments
            as_at_date
            assent_date
            commencement_date
            expression_date
            expression_frbr_uri
            frbr_uri
            language
            numbered_title
            parent_work
            points_in_time
            publication_date
            publication_document
            publication_name
            publication_number
            repeal
            repealed
            stub
            title
            type_name
            url
        """.split()

        for key in list(work.keys()):
            if key not in KEEP:
                del work[key]

        work['repealed'] = bool(work['repeal'])

        # toc
        toc = []
        if not work['stub']:
            log.info(f"- Fetching TOC")
            resp = self.indigo.get(work['url'] + '/toc.json', timeout=TIMEOUT)
            resp.raise_for_status()
            toc = resp.json()['toc']
        work['toc'] = toc

        # content
        log.info(f"- Fetching HTML")
        resp = self.indigo.get(work['url'] + '.html', timeout=TIMEOUT)
        resp.raise_for_status()
        work['content'] = resp.text


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--quick', action='store_true', default=False)
    parser.add_argument('place', nargs='*', help='Place code to load (defaults to all)')
    args = parser.parse_args()

    updater = Updater()
    updater.skip_archive = args.quick
    updater.skip_images = args.quick
    updater.update_content(args.place)
