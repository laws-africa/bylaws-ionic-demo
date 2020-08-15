<template>
  <div>
    <ion-item detail="false" @click="jump(toc.id)">
      <ion-label class="ion-text-wrap">{{ toc.title }}</ion-label>
    </ion-item>
    <div v-if="toc.children" class="ion-padding-start">
      <TocItem v-for="t in toc.children" v-bind:toc="t" v-bind:key="t.id" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "TocItem",
    props: ['toc'],
    methods: {
      jump (id) {
        // scroll manually, so that the href isn't added to the router history list
        const el = document.getElementById(id);
        const scrolling = document.getElementById('main-content')
          .querySelector('ion-content').shadowRoot
          .querySelector('main');
        scrolling.scrollTop = el.offsetTop - 65;
      }
    }
  };
</script>
