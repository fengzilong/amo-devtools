const all = [
	{ key: 'state', text: 'state' },
	{ key: 'diff', text: 'diff' },
	{ key: 'action', text: 'action' },
];

export default {
	name: 'tabs',
	state: {
		source: all,
		selected: 'state'
	},
	reducers: {
		select( state, key ) {
			state.selected = key;
		}
	}
}
