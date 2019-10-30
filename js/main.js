console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            locService.getLocationName({ lat: 32.0749831, lng: 34.9120554 }).then(data => document.querySelector('.location-text').innerText = data.plus_code.compound_code.substring(8));
        })
        .catch(console.log('INIT MAP ERROR'));


    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            locService.getLocationName({ lat: pos.coords.latitude, lng: pos.coords.longitude }).then(data => document.querySelector('.location-text').innerText = data.plus_code.compound_code.substring(8));
            locService.getLocationName({ lat: 32.0749831, lng: 34.9120554 }).then(data => document.querySelector('.location-text').innerText = data.plus_code.compound_code.substring(8));
        })
        .catch(err => {
            console.log('err!!!', err);
        })
})