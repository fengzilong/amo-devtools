export default {
	name: `JSONTreeProp`,
	template: `
		<div class='json-tree-data'>
			<div class='json-tree-data-key'>
				<img
					src="/arrow.svg"
					alt="arrow"
					class="arrow item {opened ? 'arrow-down' : null} {hasChildren ? '': 'hide'}"
					on-click={opened = !opened}
				/>
				<span class="key item" on-click={opened = !opened}>{key + ':'}</span>

				{#if this.isPrimitive(value)}
					{#if type === 'String'}
						<span class='item string'>"{value}"</span>
					{#else}
						<span class='item primitive'>{value}</span>
					{/if}
				{#elseif type === 'Array'}
					<span class='item others'>Array[{value.length}]</span>
				{#else}
					<span class='item others'>{type}</span>
				{/if}
			</div>
			{#if opened && hasChildren}
			<div class='json-tree-data-props' style='padding-left:20px'>
				{#list Object.keys(value) as k}
					<JSONTreeProp key={k} value={value[k]} />
				{/list}
			</div>
			{/if}
		</div>
	`,
	computed: {
		type: function(data) {
			return this.type(data.value);
		},
		hasChildren: function(data) {
			return ((this.type(data.value) === 'Array') ||
				(this.type(data.value) === 'Object')) &&
				((data.value.length || Object.keys(data.value).length));
		}
	},
	config: function() {
		this.data.opened = false;
	},
	isPrimitive: isPrimitive,
	type: type
};

function isPrimitive(arg) {
	var type = typeof arg;
	return arg === null || (type !== "object" && type !== "function");
};

function type(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
};
