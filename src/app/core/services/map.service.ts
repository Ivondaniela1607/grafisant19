import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 42.9138437;
  lng = -8.5237986;
  zoom = 15;
  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    const marker = new mapboxgl.Marker({
      color: 'red',
      draggable: false,
    })
      .setLngLat([-8.5237986, 42.9138437])
      .addTo(this.map);
  }
}
