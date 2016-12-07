import JSONTreeProp from './JSONTreeProp';

export default {
	components: {
		JSONTreeProp
	},
	template: `
		{#if source}
			<div class='json-tree'>
				{#list Object.keys(source) as k}
					<JSONTreeProp path={k} key={k} value={source[k]} />
				{/list}
			</div>
		{/if}
	`
};
