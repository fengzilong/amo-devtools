import JSONTree from './JSONTree';

export default {
	computed: {
		base: 'base',
		history: 'history',
		current: 'current',
		state() {
			const base = this.$get( 'base' );
			const history = this.$get( 'history' );
			const current = this.$get( 'current' );
			const state = ( history[ current ] && history[ current ].state ) || base.state;
			return state;
		}
	},
	components: {
		JSONTree
	},
	template: `
		<JSONTree ref="v" source="{ state }"></JSONTree>
	`,
};
