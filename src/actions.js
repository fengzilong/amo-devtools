import { formatTime } from './util';
import connect from './connect';

const port = connect();

export default {
	travel( { commit }, record ) {
		// TODO: notify page
		port.postMessage( { type: 'travel', payload: record.state } );
		commit( 'history/to', record );
	},
	travelByIndex( { dispatch, get }, index ) {
		const history = get( 'history' );
		const base = get( 'base' );
		const record = history[ index ] || base;
		dispatch( 'travel', record );
	},
	setBaseState( { commit }, state ) {
		const time = Date.now();
		const formattedTime = formatTime( Date.now() );
		commit( 'history/base', {
			time,
			formattedTime,
			state
		} );
	},
	purgeState( { commit } ) {
		commit( 'history/clear' );
	},
	addRecord( { commit }, record ) {
		const time = Date.now();
		const formattedTime = formatTime( Date.now() );
		Object.assign( record, {
			time, formattedTime
		} );
		commit( 'history/add', record );
	},
	changeTab( { commit }, key ) {
		commit( 'tabs/select', key );
	},
	backward( { dispatch, get } ) {
		const current = get( 'current' );
		const prev = current - 1;

		if ( prev < -1 ) {
			return;
		}

		dispatch( 'travelByIndex', prev );
	},
	forward( { dispatch, get } ) {
		const history = get( 'history' );
		const current = get( 'current' );
		const next = current + 1;

		if ( next > history.length - 1 ) {
			return;
		}

		dispatch( 'travelByIndex', next );
	}
};
