export default {
	base: state => state.history.base,
	history: state => state.history.stack,
	current: state => state.history.current,
	tabSource: state => state.tabs.source,
	selected: state => state.tabs.selected,
}
