<template>
    <div id="resultSet">
        <div v-for="(light, index) in props.resultArray" :key="index" class="resultLights" :class="light"></div>
    </div>
</template>

<script setup>
const props = defineProps(['resultArray']);
</script>

<style scoped>
#resultSet {
    display: flex;
    justify-content: center;
    gap: 5px;
}

.resultLights {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid black;
    background: radial-gradient(darkgrey, rgb(56, 56, 56) 60%);
}

.match {
    background: radial-gradient(darkgrey, rgb(76, 187, 23) 60%);
}

.yes {
    background: radial-gradient(darkgrey, gold 60%);
}
</style>