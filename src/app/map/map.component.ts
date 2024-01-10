import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 56.1629, lng: 10.2039 }, // Coordinates for Aarhus, Denmark
      zoom: 13, // Adjust zoom level as needed
      draggable: false, // Disable map dragging
      zoomControl: false, // Disable zoom control
      streetViewControl: false, // Disable street view control
      mapTypeControl: false, // Disable map type control
      fullscreenControl: false, // Disable full-screen control
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }] // Hide points of interest
        },
        {
          featureType: 'all',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }] // Hide labels
        },
        {
          featureType: 'administrative',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }] // Hide labels
        },
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ saturation: -100 }] // Apply grayscale effect
        }
      ]
    });
  }
}
