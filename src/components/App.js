import Actions from './Actions';
import Tabs from './Tabs';
import ActionJSON from './ActionJSON';
import DiffState from './DiffState';
import FullState from './FullState';
import JSONTree from './JSONTree';

export default {
	computed: {
		tabSource: 'tabSource',
		selected: 'selected'
	},
	components: {
		Actions, DiffState, Tabs, ActionJSON, FullState
	},
	template: `
		<div class="flex">
			<div class="main flex-auto">
				<Actions></Actions>
			</div>

			<section class="sidebar flex-auto">
				<Tabs source="{ tabSource }" selected="{ selected }" on-change="{ this.dispatch( 'changeTab', $event ) }"></Tabs>

				<div class="sidebar-content">
					{#if selected === 'diff'}
						<DiffState isolate></DiffState>
					{#elseif selected === 'action'}
						<ActionJSON isolate></ActionJSON>
					{#elseif selected === 'state'}
						<FullState isolate></FullState>
					{/if}
				</div>
			</section>
		</div>
	`
};
