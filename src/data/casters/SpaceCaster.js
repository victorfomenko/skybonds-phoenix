import { getEmptyLayer } from '../helpers/defaultStructures';
import DateDayCaster from './DateDayCaster';

export default {

  format:  (value, date)=> {
    const { layers, UILayers } = formatLayers(value.layers.ids, value.layers.layersById, date)
    return {
      id: value.id,
      version: value.version,
      source: {
        layers: layers,
        include: value.include,
        exclude: value.exclude
      },
      ui: {
        ...value.ui,
        extensions: {
          web: {
            ...value.ui.extensions,
            layers: UILayers,
            activeLayerId: value.activeLayerId
          }
        }
      },
      addons: value.addons
    }
  },

  cast: (value)=> {
    const { ids, layersById } = castLayers(value.source.layers || [], value.ui.extensions.web.layers || [], value.ui.extensions.web.activeLayerId)
    return {
      id: value.id,
      version: value.version,
      layers: {
        ids: ids,
        layersById: layersById
      },
      include: value.source.include,
      exclude: value.source.exclude,
      activeLayerId: value.ui.extensions.web.activeLayerId,
      ui: {
        ...value.ui,
        extensions: {
          calendar: value.ui.extensions.web.calendar
        },
      },
      addons: value.addons
    }
  }
};

const formatLayers = (ids, layersById, date) => {
  let layers = [];
  let UILayers = [];

  ids.forEach(id => {
    const layer = formatLayer(layersById[id], id, date);
    const UILayer = formatUILayer(layersById[id], id);
    layers.push(layer);
    UILayers.push(UILayer);
  })

  return { layers, UILayers }
}


const formatLayer = (value, id, date) => {
  let layer = {
    id,
    method: value.source.method
  }
  if(value.source.method === 'set') {
    layer.functions = []

    if(value.source.filters != null) {
      const filtersArgs = formatReportLayerFilters(value.source.filters, date)
      if(filtersArgs.filters.length){
        layer.functions.push({
          name: 'filters',
          args: filtersArgs
        })
      }
    }
    if(value.source.search != null && value.source.search.query){
      layer.functions.push({
        name: 'search',
        args: {
          query: value.source.search.query,
          type: 'custom'
        }
      })
    }
    if(value.source.search != null && value.source.search.peersFor){
      layer.functions.push({
        name: 'peersFor',
        args: value.source.search.peersFor
      })
    }
    if(value.source.include != null){
      layer.functions.push({
        name: 'include',
        args: value.source.include
      })
    }
    if(value.source.exclude != null){
      layer.functions.push({
        name: 'exclude',
        args: value.source.exclude
      })
    }
  }

  return layer
}

const formatReportLayerFilters = (filters, date) => {

  let newFilters = [];
  let response = {};
  if(date) { date = DateDayCaster.format(date); }
  for(let name in filters) {
    let value = filters[name];
    if( name === 'liquidity' ||
        name === 'yield' ||
        name === 'duration' ||
        name === 'discount' ||
        name === 'price' ||
        name === 'spread' ||
        name === 'maturity') {
      if(name === 'discount') { name = 'haircut'}
      if(name === 'spread') { name = 'spreadToBMK'}
      if(name === 'maturity') { name = 'yearsToPutCallMaturity'}

      response['date'] = date
      value = value.map(item => { return String(item)})
    }
    newFilters.push({ name, value })
  }
  response['filters'] = newFilters
  return response
}


const formatUILayer = (value, id) => {
  return {
    id,
    name: value.ui.name,
    viewMode: value.ui.viewMode
  }
}


const castLayers = (sourceLayers, UILayers, activeLayerId) => {
  let ids = [];
  let layersById = {};

  sourceLayers.forEach((layer, index) => {
    const ui = UILayers[index] ? castUiLayer(UILayers[index], activeLayerId) : {};
    const source = castSourceLayer(layer);
    const data = getEmptyLayer().data;

    ids.push(String(layer.id));
    layersById[layer.id] = { source, ui, data }
  })
  return { ids, layersById }
}


const castUiLayer = ({ id, name, viewMode }, activeLayerId) => {
  if(name == null) return {}
  return Object.assign({}, { name, autoName: 'Empty set', viewMode })
}

const castSourceLayer = ({ id, method, functions }) => {
  let source = {
    search: {
      query: ''
    },
    filters: {}
  }

  if(functions != null) {
    functions.forEach(func => {
      switch(func.name) {
        case 'filters':
          func.args = castFilters(func.args.filters)
          break;
      }

      source[func.name] = func.args
    })
  }

  return {
    method,
    ...source
  }
}


const castFilters = (filters) => {
  let newFilters = {}
  filters.forEach(filter => {
    let name = filter.name
    const values = filter.value
    if (name === 'haircut') {
      name = 'discount';
    }
    if (name === 'spreadToBMK') {
      name = 'spread';
    }
    if (name === 'yearsToPutCallMaturity') {
      name = 'maturity';
    }
    newFilters[name] = values
  })
  return newFilters
}
