<template>
	<div id="container">
		<div v-for="(data, id) in list" v-bind:key="id" class="day">
			<p>{{getDay(data.datetime)}}</p>
			<img v-bind:src="'https://www.weatherbit.io/static/img/icons/' + data.weather.icon + '.png'" :alt="data.weather.description" />
			<p>max: {{data.high_temp}}, min: {{data.low_temp}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Meteo',
	data() {
		return {
			day: []
		}
	},
	props: {
		list: Array,
	},
	mounted: function() {
		this.day = new Array(7);
		this.day[0] = "Lundi";
		this.day[1] = "Mardi";
		this.day[2] = "Mercredi";
		this.day[3] = "Jeudi";
		this.day[4] = "Vendredi";
		this.day[5] = "Samedi";
		this.day[6] = "Dimanche";
	},
	methods: {
		getDay: function(dateToConvert) {
			const date = new Date(dateToConvert);
			return this.day[date.getDay()];
		}
	}
}
</script>

<style scoped>

.day {
	width: 15%;
    margin: auto;
    margin-bottom: 2%;
    padding: 10px 0px;
    border: 5px solid black;
    text-align: center;
    transition: 1.2s;
}

.day:hover {
    border: 5px solid #b59760;
    transition: 1.2s;
}

#container {
    display: flex;
    flex-direction: row;
    justify-content: 'space-around';
    flex-wrap: wrap;
}

</style>