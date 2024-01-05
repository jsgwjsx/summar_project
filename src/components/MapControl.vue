<template>
  <!-- 控件组件 -->
  <div class="guide-control" @click="toggleGuide">></div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
const { scene, map } = inject("$scene_map");
import { Logo, Zoom, Fullscreen, MouseLocation, MapTheme, LineLayer, PolygonLayer, Popup } from "@antv/l7";
const guideVisible = ref(false);
let popup ;
let guide;
//动态显示围墙
var renderlist = [];
var renderlist2 = [];
const renderlayers = () => {
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/420100_full.json')
    .then(res => res.json())
    .then(data => {
      const color = ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(12,44,132)'];
      const layer = new PolygonLayer({ name: 'pl1' })
        .source(data)
        .scale('density', {
          type: 'quantile'
        })
        .color(
          'adcode', color
        )
        .shape('fill')
        .active({color:'#fff'});
      const layer2 = new LineLayer({
        zIndex: 2,
        name: "ll1"
      })
        .source(data)
        .size(0.005)
        .shape('wall')
        .style({
          lineType: 'solid',
          dashArray: [2, 2],
          opacity: 'testOpacity',
          sourceColor: '#0DCCFF',
          targetColor: 'rbga(255,255,255, 0)'


        });
      scene.addLayer(layer);
      scene.addLayer(layer2);
      renderlist.push('pl1');
      renderlist.push('ll1')
      layer.on('click', e => {
         popup = new Popup({
          zIndex:3,
          offsets: [50, 40],
          closeButton:false
        })
          .setLnglat(e.lngLat)
          .setHTML(`<span>地区: ${e.feature.properties.name}</span><br><span>地区编号: ${e.feature.properties.adcode}</span>`);
        scene.addPopup(popup);

      })
    });
}
const wall = () => {
  fetch(
    'https://geo.datav.aliyun.com/areas_v3/bound/420100_full.json'
  )
    .then(res => res.json())
    .then(data => {
      const layer = new LineLayer({ name: "wall" })
        .source(data)
        .size(0.01)
        .shape('wall')
        .style({
          opacity: 'testOpacity',
          sourceColor: '#0DCCFF',
          targetColor: 'rbga(255,255,255, 0)'
        });
      scene.addLayer(layer);
      renderlist2.push("wall")
    });
}
scene.on('moveend', () => {

  let zooms = map.getZoom();
  if (zooms > 6 && zooms < 8) {
    if (!renderlist[0]) {
      console.log("render")
      renderlayers()
    }
  } else {
    if (renderlist[0]) {
      renderlist.forEach(id => {
        const layer = scene.getLayerByName(id)
        scene.removeLayer(layer);
        scene.removePopup(popup);
      })
      renderlist = [];
    }
  }
  if (zooms >= 9) {
    if (!renderlist2[0]) {
      wall()
    }
  } else {
    if (renderlist2[0]) {
      renderlist2.forEach(id => {
        const layer2 = scene.getLayerByName(id)
        scene.removeLayer(layer2);

      })
      renderlist2 = [];
    }
  }
})
const toggleGuide = () => {
  guideVisible.value = !guideVisible.value;
  if (guide) {
    if (guideVisible.value) {
      // addControl的第二个参数,控制控件显示的位置
      // 地图导航控件
      map.addControl(guide, "top-left");
    } else {
      map.removeControl(guide);
    }
  }
};

// 在mounted中加载控件，会出现重复加载的问题

  console.log(11111)
  guide = new MapboxDirections({
    accessToken: import.meta.env.VITE_TOKEN,
    unit: "metric", // metric | imperial
    interactive: false,
    profile: "mapbox/driving",
    controls: {
      inputs: true,
      instructions: true,
      profileSwitcher: true,
    },
  });
  //汉化插件

  // 第一个地图控件Logo
  const logo = new Logo({
    img: "https://img.gejiba.com/images/dfdb6db1623eb881e724f58d9a366af8.png",
    href: "http://www.x-zd.com/",
    position: "leftbottom",
  });
  scene.addControl(logo);

  // 第二个 Zoom
  const zoom = new Zoom({
    zoomInTitle: "放大",
    zoomOutTitle: "缩小",
    position: "bottomright",
  });
  scene.addControl(zoom);

  // 第三个 fullScreen
  const fullScreen = new Fullscreen({
    btnText: "全屏",
    exitBtnText: "退出全屏",
  });
  scene.addControl(fullScreen);

  // 第四个 mouseLocation
  const mouseLocation = new MouseLocation({
    transform: (position) => {
      return position.map((item) => item.toFixed(4));
    },
  });
  scene.addControl(mouseLocation);

  //第五个 MapTheme
  const mapTheme = new MapTheme({
    options: [
      {
        text: "streets",
        value: "mapbox://styles/mapbox/streets-v12",
        img: "/src/assets/themes/streets-v12.png",
      },
      {
        text: "outdoors",
        value: "mapbox://styles/mapbox/outdoors-v12",
        img: "/src/assets/themes/outdoors.png",
      },
      {
        text: "light",
        value: "mapbox://styles/mapbox/light-v11",
        img: "/src/assets/themes/light.png",
      },
      {
        text: "dark",
        value: "mapbox://styles/mapbox/dark-v11",
        img: "/src/assets/themes/dark.png",
      },
      {
        text: "satellite",
        value: "mapbox://styles/mapbox/satellite-v9",
        img: "/src/assets/themes/satellite.png",
      },
      {
        text: "satellite-streets",
        value: "mapbox://styles/mapbox/satellite-streets-v12",
        img: "/src/assets/themes/satellite-streets.png",
      },
    ],
  });
  scene.addControl(mapTheme);


</script>
<style>
.l7-control-mouse-location {
  transform: translateX(calc(50vw - 65px));
  transform: translateY(50px);
  background-color: rgba(0, 0, 0, 0);
  color: #fff !important;
  font-size: 12px !important;
}

.l7-control-logo {
  margin-bottom: 20px !important;
}

.l7-popper.l7-popper-start {
  z-index: 9999;
}

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right {
  z-index: 11;
}

.guide-control {
  position: absolute;
  left: 0px;
  top: 140px;
  cursor: pointer;
  color: #000;
  width: 20px;
  height: 24px;
  background-color: #fff;
  border-top-left-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 10px;
  user-select: none;
}
</style>
