import axios from 'axios';

export default () => {
	const config = useRuntimeConfig();

	const useAPI = axios.create({
		baseURL: config.public.API_BASE_URL as string,
	});

	useAPI.interceptors.response.use(
		(res) => res,
		(err) => {
			return err;
		}
	);

	return useAPI;
};
