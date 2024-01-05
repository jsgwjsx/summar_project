<template>
  <!-- 构造城市场景组件 -->
  <div></div>
</template>

<script setup>
import { inject, onMounted } from "vue";
import axios from "axios";
import { CityBuildingLayer, LineLayer, LayerSwitch, PointLayer,HeatmapLayer } from "@antv/l7";
const { scene, map } = inject("$scene_map");

const renderBuilding = async () => {
  const buildData = await axios.get("http://localhost:8080/wuhan_builds");
  const wuhan_buildingLayer = new CityBuildingLayer({ name: "武汉建筑" });
  wuhan_buildingLayer
    .source(buildData.data)
    .size("Elevation", (h) => h)
    .color("rgba(242,242,250,1.0)")
    .animate(true)
    .active({
      color: "#0ff",
      mix: 0.5,
    })
    .style({
      opacity: 0.7,
      baseColor: "rgb(16, 16, 16)",
      windowColor: "rgb(130, 160, 189)",
      brightColor: "rgb(255, 176, 38)",
      // 设置扫光效果
      sweep: {
        enable: true,
        sweepRadius: 4,
        sweepColor: "#1990FF",
        sweepSpeed: 0.5,
        // 泛光中心点
        sweepCenter: [114.3, 30.5],
      },
    })
    .filter("Elevation", (h) => h > 40);
  // 添加filter对数据进行筛选，要不然数据量太大，会导致系统卡顿
  scene.addLayer(wuhan_buildingLayer);
  return wuhan_buildingLayer
};

const renderRoad = async () => {
  // 渲染城市道路
  const road_data = await axios.get("http://localhost:8080/wuhan_roads");

  const wuhan_roadLayer = new LineLayer({ name: "武汉道路" });

  wuhan_roadLayer
    .source(road_data.data)
    .size(1)
    .shape("line")
    .color('skyblue')
    .animate({
      interval: 1, //流线间隔
      duration: 2, //流线持续时间
      trailLength: 2, //流线长度
    })
    .filter("coordinates", (evt) => {
      return evt.length > 20;
    });
  scene.addLayer(wuhan_roadLayer);
  return wuhan_roadLayer
};
var colums;
var heats;
// 在组件挂载的时候，请求城市数据
onMounted(async () => {
  const wuhan_buildingLayer = await renderBuilding()
  const wuhan_roadLayer = await renderRoad()
  await fetch('http://localhost:8080/wuhan_events')
    .then(res => res.json())
    .then(data => {

      colums = new PointLayer({name:"事故柱状图"})
        .source(data, {
          parser: {
            type: 'geojson',
          }
        })
        .shape('cylinder')
        .color(["red", "yellow"])
        .size([5, 100])
        .animate({
          enable: true,
          speed: 0.01,
        });
      scene.addLayer(colums)
    })
  await fetch(
    'http://localhost:8080/wuhan_events'
  )
    .then(res => res.json())
    .then(data => {
      heats = new HeatmapLayer({name:"事故热力图"})
        .source(data)
        .shape('heatmap')
        .size(1) // weight映射通道
        .style({
          intensity: 2,
          radius: 20,
          rampColors: {
            colors: [
              '#FF4818',
              '#F7B74A',
              '#FFF598',
              '#91EABC',
              '#2EA9A1',
              '#206C7C'
            ].reverse(),
            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
          }
        });
      scene.addLayer(heats);

      // 将两个图层放到layerSwitch中管理
      const layerSwitch = new LayerSwitch({
        title: '图层目录',
        btnText: '切换图层',
        layers: [wuhan_buildingLayer, wuhan_roadLayer, colums,heats]
      })
      scene.addControl(layerSwitch)
    })
    });
</script>
<style scoped></style>
