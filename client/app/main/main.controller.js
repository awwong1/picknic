'use strict';

(function () {

  class MainController {

    constructor($http, uiGmapGoogleMapApi) {
      this.$http = $http;
      this.awesomeThings = [];
      this.parks = [];
      this.trees = [];
      this.trees_cache = [];
      this.soccerFields = [];
      this.soccerFieldsCache = [];
      this.tree_options = {
        icon: '/assets/images/tree16.png'
      };
      this.playground_options = {
        icon: '/assets/images/playground.png'
      };
      this.spray_park_options = {
        icon: '/assets/images/spraypark.png'
      };
      this.picnic_table_options = {
        icon: '/assets/images/table29.png'
      };
      this.soccer_field_options = {
        icon: '/assets/images/soccer.png'
      };
      this.fill = { color: '#2c8aa7', opacity: '0.3' };
      this.treeslider = 50;
      this.slider = 1000;
      this.marker = {
        id: 'me',
        coords: { latitude: 53.5, longitude: -113.5 },
        options: { icon: '/assets/images/marker40.png' }
      };
      this.options = {};
      this.browserSupportFlag = Boolean();
      this.initialLocation = {};
      this.formData = { children: "" };
      this.weather = {};

      // created after tiles loaded
      this.g_map_obj = {};
      this.map = {
        center: { latitude: 53.5333, longitude: -113.5000 }, zoom: 14,
        events: {
          tilesloaded: (map) => {
            this.g_map_obj = map;
          }
        }
      };
      this.options = { scrollwheel: false };

      //Range Slider
      this.circles = [
        {
          id: 1,
          center: {
            latitude: 53.5, longitude: -113.5
          },
          radius: 1000, stroke: { color: '#FFF', weight: 3, opacity: 1 },
          fill: {
            color: '#ffcccc', opacity: 0.40
          }
        }
      ];

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
      });

      $http.get('http://api.openweathermap.org/data/2.5/weather?lat=53.5333&lon=-113.5000&appid=ada399b22b7d2525b330e37f7be56bb5').then(response => {
        this.weather = response.data;
      });

      this.handleEntities();

      uiGmapGoogleMapApi.then(maps => {
        // Initialize the geoencoder
        this.geocoder = new google.maps.Geocoder();
        document.getElementById('submit').addEventListener('click', () => {
          this.geocodeAddress(this.geocoder, this.g_map_obj);
        });
        this.handleGeoLocation();

        //AutoComplete for search
        this.autoComplete();
      });
    }

    geocodeAddress(geocoder, resultsMap) {
      var address = document.getElementById('address').value;
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resultsMap.setCenter(results[0].geometry.location);
          if ('id' in this.marker) {
            this.marker.coords = {
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng()
            };
          }
          this.marker.options = { icon: '/assets/images/marker40.png' };
          this.circles[0].center.latitude = results[0].geometry.location.lat();
          this.circles[0].center.longitude = results[0].geometry.location.lng();
          this.handleEntities();
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    handleGeoLocation() {
      /**
       * Do Geolocation logic
       * Try W3C Geolocation (Preferred)
       */
      if (navigator.geolocation) {
        this.browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(position => {
          this.initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.g_map_obj.setCenter(this.initialLocation);
          this.marker = {
            id: 'me',
            coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
            options: {
              icon: '/assets/images/marker40.png'
            }
          };
          //Set Circle
          this.circles[0].center.latitude = position.coords.latitude;
          this.circles[0].center.longitude = position.coords.longitude;
          this.circles[0].radius = 1000;
          this.handleEntities();
        }, () => {
          this.handleNoGeolocation(this.browserSupportFlag);
        });
      }
      // Browser doesn't support Geolocation
      else {
        this.browserSupportFlag = false;
        this.handleNoGeolocation(this.browserSupportFlag);
      }
    }

    handleNoGeolocation(errorFlag) {
      var edmonton = new google.maps.LatLng(53.5333, -113.5000);
      if (errorFlag == true) {
        alert("Geolocation service failed. We've placed you in Edmonton.");
        this.initialLocation = edmonton;
      } else {
        alert("Your browser doesn't support geolocation. We've placed you in Edmonton.");
        this.initialLocation = edmonton;
      }
      this.g_map_obj.setCenter(this.initialLocation);
    }

    handleEntities() {
      // TODO: LINE 1295 of angular-google-maps.js CHANGE TO ARROW NOTATION, read README
      var lat = this.circles[0].center.latitude;
      var lng = this.circles[0].center.longitude;
      var radius = Number(this.circles[0].radius) / 1000;
      this.parks = [];
      this.trees = [];
      this.playgrounds = [];
      this.spray_parks = [];
      this.picnic_tables = [];
      this.$http.get('/api/recommendations/' + lng.toString() + '/' + lat.toString() + '?radius=' + radius.toString()).then(response => {
        this.parks = response.data.parklands;
        this.trees_cache = response.data.trees;
        this.playgrounds = response.data.playgrounds;
        this.picnic_tables = response.data.picnic_tables;
        this.spray_parks = response.data.spray_parks;
        this.soccerFieldsCache = response.data.soccer_fields;
      });
    }

    addOrRmTrees() {
      if (this.formData.trees === "yes") {
        this.trees = this.trees_cache;
      } else {
        this.trees = [];
      }
    }

    addOrRmSFields() {
      if (this.formData.soccerFields === "yes") {
        console.log(this.soccerFieldsCache);
        this.soccerFields = this.soccerFieldsCache;
      } else {
        this.soccerFields = [];
      }
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', { name: this.newThing });
        this.newThing = '';
      }
    }

    sliderChange() {
      this.circles[0].radius = Number(this.slider);
      //      this.handleEntities();
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    autoComplete() {
      var input = document.getElementById("address");
      var autocomplete = new google.maps.places.Autocomplete(input);
      //autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        this.geocodeAddress(this.geocoder, this.g_map_obj);
      });
    }
  }

  angular.module('picknicApp')
    .controller('MainController', MainController);

})();
