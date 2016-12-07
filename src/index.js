import reo from 'reo';
import logger from 'reo/logger';
import App from './components/App';
import history from './models/history';
import tabs from './models/tabs';
import actions from './actions';
import getters from './getters';
import subscriptions from './subscriptions';

const app = reo();

app.use( logger() );

app.model( history );
app.model( tabs );

app.actions( actions );
app.getters( getters );

app.router( { routes: [
	{
		url: '/',
		component: App
	}
] } );

app.start( '#app' );

subscriptions( app );

// actually not-found redirect
location.href = '#!/';
