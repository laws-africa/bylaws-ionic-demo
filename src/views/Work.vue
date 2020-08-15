<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{work ? work.title : ''}}</ion-title>
      </ion-toolbar>

    </ion-header>

    <ion-content padding>
      <div class="akoma-ntoso" v-html="work.content"></div>
    </ion-content>
  </div>
</template>

<script>
  import { getPlace, getWork } from "@/store";

  export default {
    name: "Place",
    data () {
      return {
        'place': getPlace(this.$route.params.id),
        'work': getWork(this.$route.params.frbrUri),
      };
    }
  };
</script>
