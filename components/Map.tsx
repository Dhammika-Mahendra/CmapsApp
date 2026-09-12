import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

function Map() {
  const html = useMemo(
    () => `<!doctype html>
<html><head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>html,body,#map{height:100%;width:100%;margin:0;background:#e5eaed}.leaflet-control-container{display:none}</style>
</head><body><div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', {zoomControl:false, attributionControl:false}).setView([6.9271, 79.8612], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 2,
      subdomains: 'abc'
    }).addTo(map);
  </script>
</body></html>`,
    [],
  );

  return (
    <View style={styles.map}>
      <WebView
        source={{html}}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {flex: 1},
  webView: {flex: 1, backgroundColor: '#e5eaed'},
});

export default Map;