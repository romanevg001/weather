import { Component, OnInit } from '@angular/core';
import { Http, Headers,Jsonp } from '@angular/http';
import { Marker, Map, LayerGroup, TileLayer } from "leaflet";
declare var L: any;
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  map: Map;
  currentLocationMarker: Marker;
  mapLayer: LayerGroup = L.featureGroup();
  url;
  // typesMapsList: TileLayer[] = [];
  // nameTypesMapsList: string[] = [];

  constructor(
    private _http: Http,
    private _jsonp: Jsonp
  ) {
  }

  ngOnInit() {
    this.mapInit()
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude, position.coords.longitude)
        this.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
        if(!this.currentLocationMarker) this.addCurrentLocationMarker(position.coords.latitude, position.coords.longitude);
      });
    }
  }


  addCurrentLocationMarker(lat,lng) {
    console.log('boom')
    var icon = new L.divIcon({
        className:'location-marker',
        iconSize: [18,18],
        iconAnchor: [9,9]
    });
    this.currentLocationMarker = new L.Marker([0, 0], { icon: icon });
    this.currentLocationMarker.addTo(this.map);
    this.currentLocationMarker.setLatLng([lat,lng]);

    this.getWeather(lat,lng);
  }

  initMapLayer(){
    var tileUrl = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var subdomains = ['a','b','c']; 
    var tileAttribution = '';
    var maxZoom = 19;
    var newTypeMaps = L.tileLayer(tileUrl,{maxZoom: maxZoom, attribution: tileAttribution, subdomains: subdomains})
    this.mapLayer.addLayer(newTypeMaps);
    newTypeMaps.bringToFront();
    this.mapLayer.addTo(this.map);
  }


  mapInit() {
    this.map = L.map("map-city", {
        zoomControl: false,
        zoom: 12,
        minZoom: 4,
        maxZoom: 19,
        attributionControl: false
    });

    this.initMapLayer();

    // this.routeLine = new RouteLine({
    //     lineStyle: {
    //         color: '#fa5400',
    //         opacity: 1,
    //         weight: 5,
    //         stroke: '#4a4a4a',
    //         'stroke-width': 1
    //     },
    //     map: this.map

    // });
    // this.mapLayer = new RouteMapLayers();
    // this.routeMapLayers.controlMapLayers('openstreetmap');

    // this.routeLine.lineLayer.addTo(this.map);
    // this.routeMapLayers.layersGroup.addTo(this.map);
    // this.routeOnmapMarkers.markersLayer.addTo(this.map);
    

    // this.map.panTo(new L.LatLng(this.data.startPoint.latitude, this.data.startPoint.longitude));
    this.getCurrentLocation(); 
    this.map.on('click',this.mapClick.bind(this));
    // this.addSearchMarker();
  }

  mapClick(e){

    this.getWeather(e.latlng.lat, e.latlng.lng)

  }

  getWeather(latitude, longitude){
    // this._http.get(` https://api.weather.yandex.ru/v1/forecast?lat=${latitude}&lon=${longitude}`)
  
    // .subscribe((res)=>{
    //   console.log(res)
    // });
    
 this._jsonp.get(`https://yandex.ru/pogoda/front/map/forecast?lt=${latitude},${longitude}&rb=${latitude},${longitude}&zoom=12&lang=ru`,{
   
 })
  
    .subscribe((res)=>{
      console.log(res)
    });
    // var mashapeKey = 'O9p2cWOU18mshKOD0m6aBMMVXOrxp1PaIUYjsniijuS94Ib56u';
    // this._http.get(`https://simple-weather.p.mashape.com/aqi?lat=${latitude}&lng=${longitude}`, {
    //     headers: new Headers({
    //       'X-Mashape-Key': mashapeKey,
    //       'Accept': 'text/plain'
    //     })
    //   })
    //   .subscribe((res)=>{
    //     this.url = res.url;
    //     console.log(res)
    //   });
  
  }

}




//  this.http.get(`https://simple-weather.p.mashape.com/aqi?lat=${latitude}&lng=${longitude}`, {
//       headers: new Headers({
//         'X-Mashape-Key': this.mashapeKey,
//         'Accept': 'text/plain'
//       })
//     });