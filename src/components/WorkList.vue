<template>
  <ion-list>
    <ion-item v-for="work in works" :key="work.frbr_uri" detail @click="navigate(work)">
      <ion-label>{{ work.title }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
export default {
  name: "WorkList",
  props: ['works'],

  methods: {
    navigate (work) {
      console.log(work);
    }
  }
};
</script>
