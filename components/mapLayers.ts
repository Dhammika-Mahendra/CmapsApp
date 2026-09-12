export type MapLayerId = 'local-admin';

export type MapLayerState = Record<MapLayerId, boolean>;

export const INITIAL_MAP_LAYERS: MapLayerState = {
  'local-admin': false,
};

export const CHIP_LAYER_ACTIONS: Record<string, MapLayerId | undefined> = {
  '11': 'local-admin',
};
