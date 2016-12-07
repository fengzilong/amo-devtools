const jsondiff = jsondiffpatch.create();

export default {
	computed: {
		base: 'base',
		history: 'history',
		current: 'current'
	},
	template: `
		<div ref="v"></div>
	`,
	config() {
		this.$watch( 'current', () => this.renderDiff() );
	},
	init() {
		this.renderDiff();
	},
	renderDiff() {
		const base = this.$get( 'base' );
		const history = this.$get( 'history' );
		const current = this.$get( 'current' );

		const baseState = base.state;
		const oldState = ( history[ current - 1 ] && history[ current - 1 ].state ) || baseState;
		const newState = ( history[ current ] && history[ current ].state ) || baseState;

		const delta = jsondiff.diff( oldState, newState );

		if ( !delta ) {
			this.$refs.v.innerHTML = '<div style="padding: 0 15px;">no changes</div>';
			return;
		}

		if ( this.$refs.v ) {
			this.$refs.v.innerHTML = jsondiffpatch.formatters.html.format( delta, oldState )
		}
	}
};
