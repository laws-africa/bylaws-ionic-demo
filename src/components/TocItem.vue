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
        const el = document.getElementById(id);
        el.offsetParent.scrollTo({top: el.offsetTop - 65, behavior: 'smooth'});
      }
    }
  };
</script>
