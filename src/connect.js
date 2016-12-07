let port;

export default () => {
	if ( !port ) {
		port = chrome.runtime.connect( {
			name: 'devtools_' + chrome.devtools.inspectedWindow.tabId
		} );
	}

	return port;
};
