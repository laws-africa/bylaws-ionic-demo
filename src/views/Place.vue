<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Places" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{place ? place.name : ''}}</ion-title>
      </ion-toolbar>

    </ion-header>

    <ion-content padding>
      <WorkList v-bind:works="activeWorks" v-bind:title="'By-laws'" />
      <WorkList v-bind:works="repealedWorks" v-bind:title="'Repealed'" v-if="repealedWorks"/>
    </ion-content>
  </div>
</template>

<script>
  import { getPlace } from "@/store";
  import { WORKS } from "@/store/works";
  import WorkList from '@/components/WorkList';

  export default {
    name: "Place",
    components: { WorkList },
    computed: {
      activeWorks () {
        const works = this.allWorks
          .filter(w => this.place.works.includes(w.frbr_uri))
          .filter(w => !w.stub && !w.repealed)
          .sort((a, b) => a.title.localeCompare(b.title));
        return works;
      },
      repealedWorks () {
        const works = this.allWorks
          .filter(w => this.place.works.includes(w.frbr_uri))
          .filter(w => !w.stub && w.repealed)
          .sort((a, b) => a.title.localeCompare(b.title));
        return works;
      }
    },
    data () {
      const place = getPlace(this.$route.params.place);
      return {
        'place': place,
        'allWorks': WORKS,
      };
    }
  };
</script>
