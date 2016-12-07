export const formatTime = ts => {
	const time = new Date( ts );
	return `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`
};

function repeat (str, times) {
	return (new Array(times + 1)).join(str);
}

function pad (num, maxLength) {
	return repeat('0', maxLength - num.toString().length) + num;
}
