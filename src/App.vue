<template>
  <!-- 头部组件 -->
  <Header/>
  <div id="components">
    <router-view></router-view>
  </div>
  <div id="map"></div>
</template>

<script setup>
const token=import.meta.env.VITE_TOKEN
console.log(token);
import {onMounted} from 'vue'
// 引入mapbox
import mapboxgl from 'mapbox-gl'
import {app} from './main'
// 引入L7
import {Scene} from '@antv/l7'
import {Mapbox} from '@antv/l7-maps'
import Header from './components/Header.vue'

// 组件加载的时候，初始化地图
onMounted(()=>{
  // 注册token
  const token=import.meta.env.VITE_TOKEN
  mapboxgl.accessToken=token
  // 创建mapbox地图
  const map=new mapboxgl.Map({
    container:'map',
    style:'mapbox://styles/mapbox/dark-v11',
    center:[114.30,30.50],
    zoom:1,
    projection:'globe'
  })
  // 创建L7 scene
  const scene=new Scene({
    id:'map',
    map:new Mapbox({
      mapInstance:map
    }),
    logoVisible:false
  })
  map.addControl(new MapboxLanguage({
            defaultLanguage:"zh-Hans"//默认语言
         }))
  map.on('style.load',()=>{
    // 开启雾化
    map.setFog({})
  })
  // 将scene和map传给子组件
  console.log(app);
  app.provide('$scene_map',{scene,map})
})
</script>

<style scoped>
 #map{
  width: 100vw;
  height: 100vh;
 }

 #components{
  position: absolute;
  z-index: 3;
 }
</style>
