import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {MapLayerState} from './mapLayers';

type MapProps = {
  layers: MapLayerState;
  localAdminFeatureColorsEnabled: boolean;
  colPostFeatureColorsEnabled: boolean;
};
const localMapUri = 'file:///android_asset/map.html';

function Map({
  layers,
  localAdminFeatureColorsEnabled,
  colPostFeatureColorsEnabled,
}: MapProps) {
  const webViewRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapReady) return;

    Object.entries(layers).forEach(([layerId, visible]) => {
      const message = JSON.stringify({layerId, visible});
      webViewRef.current?.injectJavaScript(
        `window.setMapLayerVisibility && window.setMapLayerVisibility(${message}); true;`,
      );
    });
  }, [layers, mapReady]);

  useEffect(() => {
    if (!mapReady) return;

    const message = JSON.stringify({enabled: localAdminFeatureColorsEnabled});
    webViewRef.current?.injectJavaScript(
      `window.setLocalAdminFeatureColorsEnabled && window.setLocalAdminFeatureColorsEnabled(${message}); true;`,
    );
  }, [localAdminFeatureColorsEnabled, mapReady]);

  useEffect(() => {
    if (!mapReady) return;

    const message = JSON.stringify({enabled: colPostFeatureColorsEnabled});
    webViewRef.current?.injectJavaScript(
      `window.setColPostFeatureColorsEnabled && window.setColPostFeatureColorsEnabled(${message}); true;`,
    );
  }, [colPostFeatureColorsEnabled, mapReady]);

  return (
    <View style={styles.map}>
      <WebView
        ref={webViewRef}
        source={{uri: localMapUri}}
        onLoadEnd={() => setMapReady(true)}
        onMessage={event => console.warn('Map layer:', event.nativeEvent.data)}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
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