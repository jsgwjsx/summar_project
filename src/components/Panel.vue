<template>
  <div class="panel">
    <div class="panel-header">
        <slot name="header"></slot>
    </div>
    <div class="panel-content">
        <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.panel{
    max-width: 500px;
    max-height: 500px;
    min-width: 200px;
    min-height: 100px;
    color: #fff;
    margin-bottom: 10px !important;
}

.panel-header{
    width: 100%;
    height: 20px;
    background: url('../assets/chart-item.png');
    background-size: 88% 100%;
    background-repeat:no-repeat;
    background-position: 24%;
    text-align: center;
    margin-bottom: 10px;
    line-height: 20px;
}

.panel-content{
    position: relative;
    min-height: 100px;
    background: #53697670;
    border-radius: 10px;
    padding: 10px;
}

.panel-content::after{
    content:'';
    position: absolute;
    left: 0;
    top: -6px;
    width: 110px;
    height: 30px;
    background-image: url('../assets/border.png');
    transform: rotate(180deg);
}

.panel-content::before{
    content:'';
    position: absolute;
    right: 0;
    bottom: -6px;
    width: 110px;
    height: 30px;
    background-image: url('../assets/border.png');
}
</style>