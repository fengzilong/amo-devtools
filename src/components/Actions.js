export default {
	computed: {
		base: 'base',
		history: 'history',
		current: 'current'
	},
	template: `
		<div class="actions" ref="v">
			<div class="action flex { current === -1 ? 'action-active' : '' }" on-click="{ this.dispatch( 'travel', base ) }">
				<div class="flex-auto">
					Base State
				</div>
				<div>
					{ base.formattedTime }
				</div>
			</div>

			{#list history as h}
			<div class="action flex { current === h_index ? 'action-active' : '' }" on-click="{ this.dispatch( 'travel', h ) }">
				<div class="flex-auto">
					{ h.action.type }
				</div>
				<div>
					{ h.formattedTime }
				</div>
			</div>
			{/list}
		</div>
	`,
	init() {
		const $scrollContainer = this.$refs.v;
		this.$watch( 'history', ( nv, ov ) => {
			if ( nv && ov && nv.length > ov.length ) {
				$scrollContainer.scrollTop = $scrollContainer.scrollHeight;
			}
		} );
	}
};
