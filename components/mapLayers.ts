export type MapLayerId = 'local-admin' | 'local-gov' | 'col-post';

export type MapLayerState = Record<MapLayerId, boolean>;

export const INITIAL_MAP_LAYERS: MapLayerState = {
  'local-admin': false,
  'local-gov': false,
  'col-post' : false,
};

export const CHIP_LAYER_ACTIONS: Record<string, MapLayerId | undefined> = {
  '11': 'local-admin',
  '21': 'local-gov',
  '31': 'col-post'
};
