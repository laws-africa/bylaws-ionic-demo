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
      <WorkList v-bind:works="works" />
    </ion-content>
  </div>
</template>

<script>
  import { getPlace, getWorks } from "@/store";
  import WorkList from '@/components/WorkList';

  export default {
    name: "Place",
    components: { WorkList },
    data () {
      const place = getPlace(this.$route.params.id);
      return {
        'place': place,
        'works': getWorks(place),
      };
    }
  };
</script>
