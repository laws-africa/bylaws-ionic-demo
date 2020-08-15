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
      <ion-spinner v-if="this.loading"></ion-spinner>
      <div v-else>
        <WorkList v-bind:works="activeWorks" v-bind:title="'By-laws'" />
        <WorkList v-bind:works="repealedWorks" v-bind:title="'Repealed'" v-if="repealedWorks"/>
      </div>
    </ion-content>
  </div>
</template>

<script>
  import { fetchPlace, fetchPlaceWorks } from "@/store";
  import WorkList from '@/components/WorkList';

  export default {
    name: "Place",
    components: { WorkList },
    data () {
      return {
        loading: true,
        place: null,
        works: [],
      };
    },
    computed: {
      activeWorks () {
        return this.works
          .filter(w => !w.stub && !w.repealed)
          .sort((a, b) => a.title.localeCompare(b.title));
      },
      repealedWorks () {
        return this.works
          .filter(w => !w.stub && w.repealed)
          .sort((a, b) => a.title.localeCompare(b.title));
      }
    },
    created () {
      fetchPlace(this.$route.params.place).then(place => {
        this.place = place;
        fetchPlaceWorks(this.place).then(works => {
          this.loading = false;
          this.works = works;
        });
      });
    }
  };
</script>
