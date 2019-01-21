import { Component } from '@angular/core';

//Start leaflet dependencies
import * as L from 'leaflet';
// configuration -> https://github.com/nextzen/leaflet-geocoder
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
//end leaflet dependencies

//esri leaflet dependencies
import * as G from "esri-leaflet-geocoder";



//import * as esri from "esri-leaflet";

import { Map } from 'leaflet';
import { OnInit } from '@angular/core';
import { Geocoding } from 'esri-leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  private Geocoding:any = G ;


 

  ngOnInit(): void {

    let map = this.getMap();
    
   
    let searchControl: any = this.createandGetSearchControl(map);

    this.centerMapInSantiago(map);

   // var resultsLayer= this.getResultLayer(map);

    this.searchControlOnAddMarkerEvent(searchControl,map);


    


}

private getMap(): any{

  let map = L.map('map',{

  });

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  return map;
}

private centerMapInSantiago(map){

  map.setView([-33.431670749999974, -70.63478249999997], 11);
/*
  var geocoder = this.Geocoding.geocodeService();
  geocoder.geocode().text('Santiago').run(function (error, response) {
    map.fitBounds(response.results[0].bounds);
  });*/
}

private getResultLayer(map):any{
return L.layerGroup().addTo(map);
}

private searchControlOnAddMarkerEvent(searchControl,map){
  let lat;
  let lng;
  searchControl.on('results',data => {
    
    console.log(data);
     // console.log(data);
    
     // resultsLayer.clearLayers();
      for(var i = data.results.length - 1; i>=0; i--){
/*
    let marker= L.marker(data.results[i].latlng,).bindPopup('Foo', {
         autoPan: false,
          zoomAnimation : false
      }).addTo(map).openPopup();

      map.removeLayer(marker);
      lat= data.results[i].latlng.lat;
      lng=data.results[i].latlng.lng;*/

     // console.log(data.results[i].latlng.lat)

     lat= data.results[i].latlng.lat;
     lng=data.results[i].latlng.lng;
    }
   this.updateRouting(lat,lng, map);

    });
}


private routeControl: any;

updateRouting(lat,lng, map){ 
/*this wprks
  if(this.routeControl!=undefined)
  map.removeControl(this.routeControl);

  this.routeControl= L.Routing.control({
    
    waypoints: [
      //Hardcoded From
      L.latLng(-33.568065,  -70.584723),
      L.latLng(lat, lng),

    ],
    
    show: false,
  }).addTo(map);

*/

if(this.routeControl!=undefined)
map.removeControl(this.routeControl);

let letL:any=L;

var geocoder = letL.Control.Geocoder.nominatim(),
waypoints = [L.Routing.waypoint(L.latLng(lat, lng), "Isidora goyeneceha 3000"),L.Routing.waypoint(L.latLng(-33.568065,  -70.584723), "los sauces 28")], // can be populated later

this.routeControl= L.Routing.control({
    show: false,
    plan: L.Routing.plan(waypoints, {
            createMarker: function(i, wp) {
                return L.marker(wp.latLng, {
                    draggable: false
                }).bindPopup(wp.name);
            },
        geocoder: geocoder,
        routeWhileDragging: false,
    })
}).addTo(map);

}



private createandGetSearchControl(map) : any{
 return this.Geocoding.geosearch({
   //Las opciones van acá en formato json: opciones-> https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html
  zoomToResult: false
 }).addTo(map);
}
  
}

 
