<template>
    <div class="g2-left">
        <div class="panel">
    <div class="panel-header">
      武汉十大著名景点
    </div>
    <div class="panel-content">
            <div  v-for="(item,index) in datalist" :key="item.properties.id" @click="renderdetail(index,item)">
                 <div>{{index+1}}. {{item.properties.name}}</div>
            </div>
  </div>     
       </div>   
    </div>
    <div class="g2-right " v-if="isshow_detail">
      <div class="panel-header">景区简介</div>
      <div class="panel-content2" >
         <div>
          <img :src="imagesrender" alt="" class="images">
        </div>
        <div class="introduce">
           景区简介:<p> &emsp;&emsp;{{introduces}}</p>
        </div>
        <div style="padding: 20px;">
            <a v-if="location_href" :href="location_href">官网地图--></a>

          </div>
         </div>  
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref,inject,} from 'vue';
  import mapboxgl from 'mapbox-gl'
  const {scene,map} = inject('$scene_map')
    var datalist = ref([])
    var isshow_detail = ref(false)
    var markerlist = [];
    var imagesrender = ref();
   var  introduces = ref();
   var location_href = ref()
  onMounted(()=>{
    fetch("http://localhost:8080/scene_path").then(res=>res.json())
      .then(data=>{
       datalist.value = data.features
      })
 
  })
 scene.on('moveend', () => {
 
let zooms = map.getZoom();
   if(zooms<=8&&markerlist[0] ){
    markerlist.forEach(item => {
      item.remove()
  } )
   markerlist = []
   }
})
 const renderdetail=(index,item)=>{

  isshow_detail.value = true
  markerlist.length && markerlist.forEach(item => {
                        item.remove()
  })
  markerlist = []
  imagesrender.value = datalist.value[index].properties.imgurl
  introduces.value = datalist.value[index].properties.introduce
  location_href.value = datalist.value[index].properties.homepage
  console.log(imagesrender)
  map.flyTo({
     center:[item.geometry.coordinates[0],item.geometry.coordinates[1]],
     zoom:13,
      pitch: 60,
      bearing: 40,
    })
      const marker =  new mapboxgl.Marker(
            {
                //颜色
                color:"red",
                //是否可拖拽
                draggable:false,
                //受三维地形遮挡等等透明度
                occludedOpacity:0.6,
                //旋转
                // rotation:45,
                //缩放
                scale:1,
            }
         )
           .setLngLat([item.geometry.coordinates[0],item.geometry.coordinates[1]])
             .addTo(map)
             markerlist.push(marker);
  }

 
  </script>
  <style scoped>
    .g2-left {
    position: absolute;
    left: 1vw;
    top: 70px;
    width: 25vw;
  }
  
  .g2-right {
    width: 25vw;
    position: absolute;
    left: 74vw;
    top: 70px;
  }
  .panel-header{
    color: white;
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
.panel-content>div{
    position: relative;
    font-size: 12px;
    padding: 15px;
    color: white;
    cursor: pointer;
}
.panel-content{
  border-radius: 10px;
  background: #53697670;
  position: relative;
    font-size: 12px;
    padding: 10px;
    color: white;
    cursor: pointer;
}
.panel-content>div:hover{
  color: #536976;
 
}
.images{
   width: 300px;
   height: 150px;
}
.panel-content2{
  border-radius: 10px;
  background: #53697670;
  position: relative;
 font-size: 12px;
  padding: 20px;
  color: white;
  cursor: pointer;

}
.introduce{
  font-size:"12px";
  
}
a{
  color:skyblue;
}
  a:hover{
    color: gray;
  }
  </style>
  