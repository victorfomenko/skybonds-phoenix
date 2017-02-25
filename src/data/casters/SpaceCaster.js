export default {

  format:  (value)=> {
    const layers = formatLayers(value.source.layers, value.source.layersById)

    return {
      id: value.id,
      version: value.version,
      source: {
        layers: layers,
        include: value.source.include,
        exclude: value.source.exclude
      },
      ui: {
        ...value.ui,
        extensions: {
          web: value.ui.extensions
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

const formatLayers = (layers, layersById) => {
  let result = [];
  layers.forEach(id => {
    const layer = formatLayer(layersById[id]);
    result.push(layer);
  })

  return result

}


const formatLayer = (value) => {

}


const castLayers = (sourceLayers, uiLayers, activeLayerId) => {
  let ids = [];
  let layersById = {};

  sourceLayers.forEach((layer, index) => {
    const ui = uiLayers[index] ? castUiLayer(uiLayers[index], activeLayerId) : {};
    const source = castSourceLayer(layer);
    const data = {
      search: {
        isins: []
      },
      filters: {
        isins: [],
        stats: []
      },
      isinsAll: [],
      isinsByQuota: [],
      bonds: []
    }

    ids.push(String(layer.id));
    layersById[layer.id] = { source, ui, data }
  })
  return { ids, layersById }
}


const castUiLayer = ({ id, name, viewMode }, activeLayerId) => {
  if(name == null) return {}
  const active = String(id) === activeLayerId;
  return Object.assign({}, { name, autoName: 'Empty set', viewMode, active })
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
