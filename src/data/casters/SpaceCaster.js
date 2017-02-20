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
	const { layers, layersById } = castLayers(value.source.layers || [])
	
  	return {
  		id: value.id,
  		version: value.version,
  		source: {
  			layers: layers,
  			layersById: layersById,
  			include: value.source.include,
  			exclude: value.source.exclude
  		},
  		ui: {
  			...value.ui,
  			extensions: value.ui.extensions.web
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


const castLayers = (value) => {
	let layers = [];
	let layersById = {};

	value.forEach((layer, index) => {
		layers.push(layer.id);
		layersById[layer.id] = castLayer(layer);
	})
	return { layers, layersById }
}


const castLayer = ({ id, method, functions }) => {
  	let layerData = {}

  	if(functions != null) {
	  	functions.forEach(func => {
	  		switch(func.name) {
	  			case 'filters':
		  			func.args = {
		  				...func.args,
		  				filters: castFilters(func.args.filters)
		  			}
		  			break;
	  		}

	  		layerData[func.name] = func.args
	  	})	
  	}
  	
	return {
		id,
		method,
		...layerData
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
