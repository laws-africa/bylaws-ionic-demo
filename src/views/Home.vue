<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>By-laws</ion-title>
      </ion-toolbar>

    </ion-header>

    <ion-content padding>
      <PlaceList/>
    </ion-content>
  </div>
</template>

<script>
  import PlaceList from "@/components/PlaceList";

  export default {
    name: "home",
    components: { PlaceList }
  };
</script>
