const port = chrome.runtime.connect( {
	name: 'reo_'
} );

window.addEventListener( 'message', function( event ) {
	if( event.source !== window ) {
		return;
	}

	const { type, message } = event.data;

	if( type === "REO_PAGE_MESSAGE" ) {
		port.postMessage( message );
	}
}, false );
