async function getForecast() {
    const apiKey = "b5a1f0bcadae4ccb90e962fa6fddc967";
    const city = document.getElementById("cityInput").value || "London";
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    if (!city) {
        forecastDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        const locationRes = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
        const locationData = await locationRes.json();
        const { lat, lon } = locationData.data[0];

        const forecastRes = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=15&key=${apiKey}`);
        const forecastData = await forecastRes.json();

        forecastData.data.forEach(day => {
            const date = new Date(day.valid_date);
            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric"
            });

            const temp = day.temp;
            const icon = day.weather.icon;
            const description = day.weather.description;

            forecastDiv.innerHTML += `
                <div class="day">
                    <h3>${formattedDate}</h3>
                    <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="${description}" />
                    <p>${description}</p>
                    <p>${temp}&deg;C</p>
                </div>
            `;
        });
    } catch (error) {
        forecastDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

window.onload = () => {
    document.getElementById("cityInput").value = "Delhi";
    getForecast();
};
