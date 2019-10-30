
export default {
    initMap,
    addMarker,
    panTo,
    getLastMarker
}


var map;
var markers = [];


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function addMarker(position) {
    var marker = new google.maps.Marker({
        position,
        map,
        title: 'Hello World!'
    });
    markers.push(position);
    console.log('Markers', markers);
    return marker;
}

function getLastMarker() {
    console.log(markers);
    return markers[markers.length - 1];
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyC4x3iSpxL9G-6e5F65hQFyE3VR2cL6THQ'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



