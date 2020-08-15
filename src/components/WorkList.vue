<template>
  <ion-list>
    <ion-list-header>{{ title }}</ion-list-header>
    <ion-item v-for="work in works" :key="work.frbr_uri" detail @click="navigate(work)">
      <ion-label class="ion-text-wrap">
        <h2>{{ work.title }}</h2>
        <p>{{ work.publication_date }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
export default {
  name: "WorkList",
  props: ['works', 'title'],

  methods: {
    navigate (work) {
      this.$router.push('/place/' + this.$route.params.place + '/work/' + work.id);
    }
  }
};
</script>
