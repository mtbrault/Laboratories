<template>
	<div id="header">
		<h1>Bienvenue sur myWeather</h1>
		<p>Voici la météo pour la ville de {{city.city_name}}, {{city.country_code}}</p>
	</div>
</template>

<script>
export default {
	name: 'Header',
	props: {
		city: Object
	},
}
</script>

<style scoped>

#header {
	text-align: center;
	margin-bottom: 5%;
}

</style>