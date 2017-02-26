import rewire from 'rewire';
import {expect, assert} from 'chai';

let SpaceCaster = rewire('../src/data/casters/SpaceCaster');
const castLayers = SpaceCaster.__get__('castLayers');

describe('SpaceCaster', function () {
	it('castLayers', () => {
		const sourceLayersList = [{
			id: 1,
			method: 'set',
			functions: [{
				name: 'filters',
				args: {
					filters: [{
						name: 'rating',
						value: ['A+','A','A-']
					},{
						name: 'corporations',
						value: ['corporations']
					}],
					date: null
				}
			},{
				name: 'search',
				args: {
					query: 'asdw',
					type: 'custom',
					limit: null,
					from: null,
					attrs: null
				}
			},{
				name: 'peersFor',
				args: []
			},{
				name: 'include',
				args: []
			},{
				name: 'exclude',
				args: []
			}]
		},
		{
			id: 2,
			method: 'set',
			functions: []
		}]

		const uiLayersList = [{id: 1, name: 'Layer Name', viewMode: 'bonds'}]

		const result = {
			ids: ['1','2'],
			layersById: {
				'1': {
					source: {
            filters: {
            	corporations: ['corporations'],
            	rating: ['A+','A','A-'],
            },
            search: {
            	query: 'asdw',
							type: 'custom',
							limit: null,
							from: null,
							attrs: null
            },
						peersFor: [],
	            include: [],
	            exclude: [],
	            method: 'set'
					},
					ui: {
						name: 'Layer Name',
            autoName: '',
						viewMode: 'bonds'
					},
          data: {
            bonds: [],
            filters: {
              isins: [],
              stats: [],
            },
            isinsAll: [],
            isinsByQuota: [],
            search: {
              isins: [],
            }
          }
				},
				'2': {
					source: {
            method: 'set',
            filters: {},
            search: {
              query: ''
            }
					},
					ui: {},
          data: {
            bonds: [],
            filters: {
              isins: [],
              stats: [],
            },
            isinsAll: [],
            isinsByQuota: [],
            search: {
              isins: [],
            }
          }
				}
			}
		}

		assert.deepEqual(
			castLayers(sourceLayersList, uiLayersList),
			result
		)
	})
})
