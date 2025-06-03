const apiKey = 'cf605409c78cea2aaa9d48ecd782af70';

$(document).ready(function () {
    weatherFn('Noida'); // Default city on load
});

async function weatherFn(cName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    const degree = '\u00B0';
    $('#temperature').html(`${Math.round(data.main.temp)}${degree}C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
	
	setBackground(data.weather[0].main);
}

function setBackground(weather){
	let gradient;
	switch(weather.toLowerCase()){
		case 'clear':
			videosrc = 'sunny-2_PXyDE5gj.mp4';
			break;
		case 'clouds':
			videosrc = 'cloudy.mp4';
			break;
		case 'drizzle':
		case 'rain':
			videosrc = 'rainy.mp4';
			break;
		case 'thunderstorm':
			videosrc = 'thunder.mp4';
			break;
		case 'snow':
			videosrc = 'snow.mp4';
			break;
		case 'mist':
		case 'haze':
		case 'fog':
			videosrc = 'fog_Ijct6rY7.mp4';
			break;
		default:
			gradient = 'linear-gradient(to right, #4CAF50, #2196F3)';
			break;
	}
	const video = document.getElementById('bg-video');
	if(video){
		video.src = videosrc;
		video.load();
		video.play().catch(err => console.error('Video play error:', err))
	}
}