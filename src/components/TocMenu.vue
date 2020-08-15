<template>
  <ion-list>
    <ion-menu-toggle auto-hide="false">
      <TocItem v-for="t in toc" v-bind:toc="t" v-bind:key="t.id" />
    </ion-menu-toggle>
  </ion-list>
</template>

<script>
  import TocItem from '@/components/TocItem';

  export default {
    name: "TocMenu",
    props: ['toc'],
    components: { TocItem },
  };
</script>

