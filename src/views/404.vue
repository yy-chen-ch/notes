<template>
  <div class="container" id="not-found">
    <div class="header has-t-centered">
      <p class="title is-spaced not-found-title">糟糕！我们无法找到该页面。</p>

    </div>
    <div class="errors-categories">
      <!-- <?php wp_tag_cloud( 'smallest=20&largest=20&number=50&orderby=count' ); ?> -->
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>
<style scoped>
h1 {
  color: red;
}
</style>
