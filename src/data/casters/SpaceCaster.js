import { getEmptyLayer } from '../helpers/defaultStructures';

export default {

  format:  (value)=> {
    const { layers, UILayers } = formatLayers(value.layers.ids, value.layers.layersById)
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

  cast:  (value)=> {
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

const formatLayers = (ids, layersById) => {
  let layers = [];
  let UILayers = [];

  ids.forEach(id => {
    const layer = formatLayer(layersById[id], id);
    const UILayer = formatUILayer(layersById[id], id);
    layers.push(layer);
    UILayers.push(UILayer);
  })

  return { layers, UILayers }
}


const formatLayer = (value, id) => {
  console.log(value)
  return {
    id,
    method: value.source.method,
    //functions:
  }
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
