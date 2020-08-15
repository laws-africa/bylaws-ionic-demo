<template>
  <ion-list>
    <ion-item v-for="place in places" :key="place.id" @click="navigate(place)" detail>
      <ion-label>{{ place.name }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { PLACES } from '@/store';

export default {
  name: "PlaceList",

  data () {
    return {
      'places': PLACES,
    };
  },

  methods: {
    navigate(place) {
      this.$router.push('/place/' + place.id);
    }
  }
};
</script>
