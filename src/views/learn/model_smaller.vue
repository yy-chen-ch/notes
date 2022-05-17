
<template>
  <div class="model_smaller">
    <h3>模型小型化</h3>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
            <menu-vue></menu-vue>
        </el-aside>
        <el-main>
            <article-vue></article-vue>
        </el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import articleVue from '@/components/article.vue'
import menuVue from '@cmp/menu.vue'
</script>

<style lang="scss" scoped></style>
