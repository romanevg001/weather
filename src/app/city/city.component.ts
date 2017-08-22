import { Component, OnInit } from '@angular/core';
import { Marker, Map, LayerGroup, TileLayer } from "leaflet";
declare var L: any;
import { CityService } from './city.service';
import { ShareService } from '../services/share.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  map: Map;
  currentLocationMarker: Marker;
  mapLayer: LayerGroup = L.featureGroup();
  userPlace:string;


  constructor(
    private _cityService: CityService,
    private _shareService: ShareService,
  ) {
  }

  ngOnInit() {
    this.mapInit()
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        
        console.log(position.coords.latitude, position.coords.longitude)
        this.getCityName(position.coords.latitude, position.coords.longitude);
        this.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
        if(!this.currentLocationMarker) this.addCurrentLocationMarker(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  getCityName(lat,lng){
    this._cityService.getPlace(lat,lng).subscribe((res)=>{
        this.userPlace = (res.length > 0) ? res[0].location : '';
    })
  }


  addCurrentLocationMarker(lat,lng) {
    var icon = new L.divIcon({
        className:'location-marker',
        iconSize: [18,18],
        iconAnchor: [9,9]
    });
    this.currentLocationMarker = new L.Marker([0, 0], { icon: icon });
    this.currentLocationMarker.addTo(this.map);
    this.currentLocationMarker.setLatLng([lat,lng]);

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
    this._shareService.loaderHandler('hide');
    
  }


  mapInit() {
      this._shareService.loaderHandler('show');
    
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


  }


}

