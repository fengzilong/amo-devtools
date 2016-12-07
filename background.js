chrome.browserAction.onClicked.addListener(function() {
	chrome.runtime.reload();
});

const connections = {};

chrome.runtime.onConnect.addListener(function( port ) {
	const name = port.name;

	if ( /devtools_\d+/.test( name ) ) {
		const tabId = Number( name.split( '_' )[ 1 ] );
		connections[ tabId ] = port;

		console.log( port );

		port.onMessage.addListener( function( message ) {
			// from devtools
			if ( message.type === 'getBaseState' ) {
				// trigger hook `reo:getBaseState`
				chrome.tabs.executeScript( tabId, {
					code: `
						window.postMessage( {
								type: 'REO_BACKEND_MESSAGE',
								message: {
									type: 'getBaseState'
								}
						}, '*' );
					`
				} );
			} else if ( message.type === 'travel' ) {
				// trigger hook `reo:travel`
				chrome.tabs.executeScript( tabId, {
					code: `
						window.postMessage( {
							type: 'REO_BACKEND_MESSAGE',
							message: {
								type: 'travel',
								payload: ${ JSON.stringify( message.payload ) }
							}
						}, '*' );
					`
				} );
			}
		} );
	}

	if( name === 'reo_' ) {
		// background -> devtools
		port.onMessage.addListener( function( message, port ) {
			const tabId = port.sender.tab.id;
			const targetPort = connections[ tabId ];

			// not initialized
			if ( !targetPort ) {
				return;
			}

			targetPort.postMessage( message );
		} );
	}
});
