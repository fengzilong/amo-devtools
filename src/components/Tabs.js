export default {
	template: `
		<div class="tabs">
			<div class="tabs-header">
				<div class="tabs-header-items">
					{#list source as s}
						<div class="tabs-header-item { selected === s.key ? 'selected' : '' }" on-click="{ this.onTabClick( s.key ) }">
							{ s.text }
						</div>
					{/list}
				</div>
			</div>
		</div>
	`,
	onTabClick( key ) {
		if ( this.data.selected === key ) {
			return;
		}
		this.$emit( 'change', key );
	}
};
