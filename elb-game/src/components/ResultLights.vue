<template>
    <div id="resultSet">
        <div
            id="result1"
            class="resultLights"
        ></div>
        <div
            id="result2"
            class="resultLights"
        ></div>
        <div
            id="result3"
            class="resultLights"
        ></div>
        <div
            id="result4"
            class="resultLights"
        ></div>
        <div
            id="result5"
            class="resultLights"
        ></div>
        <div
            id="result6"
            class="resultLights"
        ></div>
        <div
            id="result7"
            class="resultLights"
        ></div>
        <div
            id="result8"
            class="resultLights"
        ></div>
    </div>
</template>

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

.match{
    background: radial-gradient(darkgrey, rgb(76, 187, 23) 60%);
}

.yes{
    background: radial-gradient(darkgrey, gold 60%);
}
</style>