<template>
  <ion-spinner v-if="!this.places.length"/>
  <ion-list v-else>
    <ion-item v-for="place in places" :key="place.id" @click="navigate(place)" detail>
      <ion-label>{{ place.name }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { getPlaces } from '@/store';

export default {
  name: "PlaceList",

  data () {
    return {
      'places': getPlaces(),
    };
  },

  methods: {
    navigate(place) {
      this.$router.push('/place/' + place.id);
    }
  }
};
</script>
