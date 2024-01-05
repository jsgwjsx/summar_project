const mockjs=require('mockjs')
const wuhan_builds=require('./GIS_DATA/Wuhan_Buildings.json')
const wuhan_roads=require('./GIS_DATA/Wuhan_roads.json')
const wuhan_events=require('./GIS_DATA/Wuhan_events.json')
const fly_path = require('./GIS_DATA/fly_path.json')
const scene_path = require('./GIS_DATA/Wuhan_scene.json')
module.exports=()=>{
    return mockjs.mock({
        wuhan_builds,
        wuhan_roads,
        wuhan_events,
        fly_path ,
        scene_path
    })
}