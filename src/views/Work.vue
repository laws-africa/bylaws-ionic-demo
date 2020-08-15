<template>
  <div class="ion-page">
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

      <div id="main-content">
        <ion-header translucent>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button text="" default-href="/"></ion-back-button>
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content padding fullscreen>
          <div v-if="work.repealed" class="ion-margin-bottom ion-text-center">
            <ion-text color="danger">
              This {{ work.type_name|lower }} has been repealed.
            </ion-text>
          </div>
          <div class="akoma-ntoso" v-html="work.content"></div>
        </ion-content>
      </div>
    </ion-split-pane>
  </div>
</template>

<script>
  import { getPlace, getWork } from "@/store";
  import TocMenu from "@/components/TocMenu";

  export default {
    name: "Work",
    components: { TocMenu },
    data () {
      return {
        'place': getPlace(this.$route.params.place),
        'work': getWork(this.$route.params.work),
      };
    },
    filters: {
      lower (v) {
        return v.toLocaleLowerCase();
      }
    }
  };
</script>
