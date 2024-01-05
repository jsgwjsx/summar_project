<template>
  <header class="header">
    <div class="timer">
        <p>2023-08-17</p>
        <p>9:39</p>
    </div>
    <span>智慧城市-武汉</span>
  </header>
</template>

<script setup>
</script>
<style scoped>
.header{
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 10vh;
    background-image: url('../assets/header.png');
    background-size: cover;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 30px;
}

.timer{
    font-size:16px;
    text-align: center;
    margin-left: 20px;
}

.header>span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>