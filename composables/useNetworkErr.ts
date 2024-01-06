export default () => {
	const useNetworkErr = (e: any) => {
		if (e.response) {
			console.log(e.response.data);
			console.log(e.response.status);
			console.log(e.response.headers);
		} else if (e.request) {
			console.log(e.request);
		} else {
			console.log(e.message);
		}
	};

	return useNetworkErr;
};
