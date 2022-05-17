<template>
    <el-menu>
        <!-- 一级 -->
        <template v-for="(s, i) in menu" :key="s.name">
            <el-sub-menu :index="i + ''" v-if="s.children">
                <template #title>{{ s.name }}</template>
                <!-- 二级 -->
                <template v-for="(ss, ii) in s.children" :key="ss.name">
                    <el-sub-menu :index="i + '-' + ii" v-if="ss.children">
                        <template #title>{{ ss.name }}</template>
                        <!-- 三级 -->
                        <template v-for="(sss, iii) in ss.children" :key="sss.name">
                            <el-menu-item :index="i + '-' + ii + '-' + iii">{{
                                    ss.name
                            }}</el-menu-item>
                        </template>
                    </el-sub-menu>
                    <el-menu-item :index="i + '-' + ii" v-else>{{
                            ss.name
                    }}</el-menu-item>
                </template>
            </el-sub-menu>
            <el-menu-item :index="i + ''" v-else>{{ s.name }}</el-menu-item>
        </template>
    </el-menu>
</template>

<script setup>
const menu = [
    { name: 1, children: [{ name: 1.1 }] },
    {
        name: 2,
        children: [
            { name: "2.1", children: [{ name: "2.1.1" }, { name: "2.1.2" }] },
        ],
    },
    { name: 3 },
];
</script>

<style lang="scss" scoped>
</style>
