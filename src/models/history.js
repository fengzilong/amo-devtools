export default {
	name: 'history',
	state: {
		stack: [],
		current: -1,
		base: {},
	},
	reducers: {
		base( state, record ) {
			state.base = record;
			record.isViewWillRender = true;
		},
		add( state, record ) {
			state.stack.push( record );
			state.current = state.stack.length - 1;
		},
		markCurrentAsWillRender( state ) {
			const currentRecord = state.stack[ state.current ];
			if ( currentRecord ) {
				currentRecord.isViewWillRender = true;
			}
		},
		clear( state ) {
			state.stack.length = 0;
			state.current = -1;
			state.base = {};
		},
		to( state, record ) {
			state.current = state.stack.indexOf( record );
		}
	}
};
