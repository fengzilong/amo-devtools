import JSONTree from './JSONTree';
export default {
	computed: {
		history: 'history',
		current: 'current',
	},
	components: {
		JSONTree
	},
	template: `

		{#if history[ current ].action}
		<JSONTree source="{ history[ current ].action }"></JSONTree>
		{#else}
		<div style="padding: 0 15px;">no action</div>
		{/if}
	`
};
