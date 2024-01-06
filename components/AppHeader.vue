<template>
	<div></div>
</template>

<script setup lang="ts">
const API = useAPI();
const catchNetworkErr = useNetworkErr();
const route = useRoute();
const userData = useState<{ name: string; icon: string }>('userData');

onMounted(async () => {
	if (!route.path.includes('/auth/callback')) {
		try {
			if (localStorage.getItem('access_token')) {
				const fetchUserData = await API.get<any>(
					'https://discord.com/api/v10/users/@me',
					{
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('access_token'),
						},
					}
				).then((res) => res.data);

				userData.value.icon = fetchUserData.avatar
					? `https://cdn.discordapp.com/avatars/${fetchUserData.id}/${fetchUserData.avatar}.png`
					: `https://cdn.discordapp.com/embed/avatars/${
							fetchUserData.discriminator % 5
					  }.png`;
				userData.value.name =
					fetchUserData.username + '#' + fetchUserData.discriminator;
			}
		} catch (e: any) {
			if (e.response) {
				if (e.response.status == 429) {
					location.reload();
					return;
				}
			}

			catchNetworkErr(e);
			alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.');
		}
	}
});
</script>
