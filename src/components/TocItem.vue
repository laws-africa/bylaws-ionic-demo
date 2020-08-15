<template>
  <div>
    <ion-item :href="'#' + toc.id" detail="false">{{ toc.title }}</ion-item>
    <div v-if="toc.children" class="ion-padding-start">
      <TocItem v-for="t in toc.children" v-bind:toc="t" v-bind:key="t.id" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "TocItem",
    props: ['toc']
  };
</script>
