import connect from './connect';

export default app => {
	const store = app.$store;

	const port = connect();

	port.onMessage.addListener( ( message = {} ) => {
		const { type, payload } = message;
		switch ( type ) {
			case 'getBaseState':
				store.dispatch( 'setBaseState', payload );
				break;
			case 'reducer':
				store.dispatch( 'addRecord', payload );
				break;
			case 'view-updated':
				store.dispatch( 'addViewUpdated' );
				break;
			case 'purgeState':
				store.dispatch( 'purgeState', payload );
				break;
		}
	} );

	// get base state when reo tab is activated
	port.postMessage( { type: 'getBaseState' } );

	// listen for keyboard stroke
	window.addEventListener( 'keyup', function( e ) {
		const keyCode = e.keyCode;
		if ( keyCode === 38 ) {
			// up
			store.dispatch( 'backward' );
		} else if ( keyCode === 40 ) {
			// down
			store.dispatch( 'forward' );
		}
	}, false );

}
