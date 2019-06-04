import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { MouseEvent } from '@agm/core';
// Import the models
import { State, Municipality, Marker, GasPrice } from './models';
// Import the service
import { BackendApiService } from './services/backend-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Declare catalogs
  states: State[] = [];
  municipalities: Municipality[] = [];
  gasPrices: GasPrice[] = [];

  selectedState: State = new State('0', 'Seleccione un estado');
  selectedMunicipality: Municipality = new Municipality('0', 'Seleccione un municipio', '');
  selectedGP: GasPrice[] = [];

  //// Set the map settings
  // google maps zoom level
  zoom: number = 5;
  // initial center position for the map
  lat: number = 23.634501;
  lng: number = -102.552784;
  // Markers array
  markers: Marker[] = [];

  constructor(private backendApiService: BackendApiService) { }

  ngOnInit() {
    // Fetch the Gas prices
    this.backendApiService.getGasPrices()
      .subscribe((data: any) => {
        console.log('getGasPrices:', data);
        if (data.results) {
          data.results.forEach((price: any) => {
            this.gasPrices.push(new GasPrice(price));
          });
        }
      });
    // Fetch the states
    this.backendApiService.getStates()
      .subscribe((data: any) => {
        console.log('getStates:', data);
        this.states = data as State[];
      });
  }

  onStateSelect(stateId) {
    // Clear the selection
    this.selectedMunicipality.zip = '0';
    this.markers = [];
    // Get the municipalities
    this.backendApiService.getMunicipalities(stateId)
      .subscribe((data: any) => {
        console.log('getMunicipalities:', data);
        this.municipalities = data as Municipality[];
      });
  }

  onMunicipalitySelect(event) {
    // Clear the selection
    this.markers = [];
    console.log('event:', event);
    let selectEl = event.target;
    console.log('selectEl:', selectEl);
    const id = selectEl.options[selectEl.selectedIndex].dataset.id;
    console.log('id:', id);
    // Find the selected municipality
    this.selectedMunicipality = this.municipalities.find(i => i.id === id);
    console.log('selectedMunicipality:', this.selectedMunicipality);
    // Find the ZIP code into the list of gas prices
    if (typeof this.gasPrices !== 'undefined') {
      console.log(typeof this.gasPrices);
      this.selectedGP = this.gasPrices.filter(i => i.codigopostal === this.selectedMunicipality.zip);
      if (typeof this.selectedGP === 'undefined' || this.selectedGP.length === 0) {
        alert('No se ha encontrado gasolinería');
      } else {
        console.log('selectedGP:', this.selectedGP);
        this.selectedGP.forEach((value) => {
          console.log(value);
          const label = `${value.razonsocial}: ${value.regular}/${value.premium}`;
          this.markers.push(new Marker(value.latitude, value.longitude, ));
        });
      }
    } else {
      alert('El catálogo de precios aún no carga');
    }
  }

  clickedMarker() {}

}
