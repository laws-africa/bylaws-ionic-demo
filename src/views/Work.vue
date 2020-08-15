<template>
  <ion-split-pane content-id="main-content">
    <ion-menu content-id="main-content" side="start">
      <ion-header>
        <ion-toolbar>
          <ion-title>Contents</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <TocMenu v-bind:toc="work.toc" />
      </ion-content>
    </ion-menu>

    <div class="ion-page" id="main-content">
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button text="" default-href="/"></ion-back-button>
            <ion-menu-button></ion-menu-button>
          </ion-buttons>

          <ion-title>{{work.title}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content padding fullscreen>
        <div class="akoma-ntoso" v-html="work.content"></div>
      </ion-content>
    </div>
  </ion-split-pane>
</template>

<script>
  import { getPlace, getWork } from "@/store";
  import TocMenu from "@/components/TocMenu";

  export default {
    name: "Work",
    components: { TocMenu },
    data () {
      return {
        'place': getPlace(this.$route.params.id),
        'work': getWork(this.$route.params.frbrUri),
      };
    }
  };
</script>
