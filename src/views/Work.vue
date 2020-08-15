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
          <TocMenu v-bind:toc="work.toc" v-if="!loading" />
        </ion-content>
      </ion-menu>

      <div class="ion-page" id="main-content">
        <ion-header translucent>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button :default-href="placeUrl"></ion-back-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content padding fullscreen>
          <ion-spinner v-if="loading"></ion-spinner>
          <div v-else>
            <div v-if="work.repealed" class="ion-margin-bottom ion-text-center">
              <ion-text color="danger">
                This {{ work.type_name|lower }} has been repealed.
              </ion-text>
            </div>
            <div class="akoma-ntoso" v-html="work.content"></div>
          </div>
        </ion-content>
      </div>
    </ion-split-pane>
  </div>
</template>

<script>
  import { fetchPlace, fetchPlaceWorks } from "@/store";
  import TocMenu from "@/components/TocMenu";

  export default {
    name: "Work",
    components: { TocMenu },
    data () {
      return {
        loading: true,
        place: null,
        work: null,
      };
    },
    filters: {
      lower (v) {
        return v.toLocaleLowerCase();
      }
    },
    computed: {
      placeUrl () {
        return this.place ? ('/place/' + this.place.id) : '/';
      }
    },
    created () {
      fetchPlace(this.$route.params.place).then(place => {
        this.place = place;
        fetchPlaceWorks(this.place).then(works => {
          this.loading = false;
          this.work = works.find(w => w.id === this.$route.params.work);
        });
      });
    }
  };
</script>
