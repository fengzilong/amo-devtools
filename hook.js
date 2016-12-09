// https://github.com/vuejs/vue-devtools/blob/master/src/backend/hook.js
// this script is injected into every page.

injectCode( ';(' + installHook.toString() + ')(window)' );

function injectCode( code ) {
	// inject the code
	var script = document.createElement('script');
	script.textContent = code;
	document.documentElement.appendChild(script);
	script.parentNode.removeChild(script);
}

function installHook(window) {
	var listeners = {};

	var hook = {
		on: function(event, fn) {
			event = '$' + event;
			(listeners[event] || (listeners[event] = [])).push(fn);
		},

		once: function(event, fn) {
			event = '$' + event;

			function on() {
				this.off(event, on);
				fn.apply(this, arguments);
			}
			(listeners[event] || (listeners[event] = [])).push(on);
		},

		off: function(event, fn) {
			event = '$' + event;
			if (!arguments.length) {
				listeners = {};
			} else {
				const cbs = listeners[event];
				if (cbs) {
					if (!fn) {
						listeners[event] = null;
					} else {
						for (let i = 0, l = cbs.length; i < l; i++) {
							const cb = cbs[i];
							if (cb === fn || cb.fn === fn) {
								cbs.splice(i, 1);
								break;
							}
						}
					}
				}
			}
		},

		emit: function(event) {
			event = '$' + event;
			let cbs = listeners[event];
			if (cbs) {
				const args = [].slice.call(arguments, 1);
				cbs = cbs.slice();
				for (let i = 0, l = cbs.length; i < l; i++) {
					cbs[i].apply(this, args);
				}
			}
		},
	};

	// receive
	let store;
	hook.on( 'reo:init', function( v ) {
		store = v;
		send( {
			type: 'purgeState'
		} );
		send( {
			type: 'getBaseState',
			payload: store.getState()
		} );
	} );
	hook.on( 'reo:getBaseState', function() {
		if ( !store ) {
			return;
		}

		send( {
			type: 'getBaseState',
			payload: store.getState()
		} );
	} );
	hook.on( 'reo:reducer', function( action, state ) {
		send( {
			type: 'reducer',
			payload: { action: action, state: state }
		} );
	} );
	hook.on( 'reo:view-updated', function( action, state ) {
		send( {
			type: 'view-updated',
			payload: { action: action, state: state }
		} );
	} );

	window.addEventListener( 'message', function( event ) {
		if( event.source !== window ) {
			return;
		}

		const { type, message } = event.data;

		// from background executeScript
		if( type === "REO_BACKEND_MESSAGE" ) {
			if ( message.type === 'getBaseState' ) {
				hook.emit( 'reo:getBaseState' );
			} else if ( message.type === 'travel' ) {
				if ( message.payload.isViewWillRender ) {
					hook.emit( 'reo:travel-to-state', message.payload.state );
				} else {
					hook.emit( 'reo:silent-travel-to-state', message.payload.state );
				}
			}
		}
	}, false );

	// send: contentscript -> background -> devtools
	function send( message ) {
		window.postMessage( { type: 'REO_PAGE_MESSAGE', message: message }, '*' );
	}

	window.__REO_DEVTOOLS_HOOK__ = hook;
}
