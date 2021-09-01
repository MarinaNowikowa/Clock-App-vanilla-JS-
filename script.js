// - *** DATE & TIME ***
const setDate = () => {
  const secondsArrow = document.querySelector('.arrows__item--second')
  const minutesArrow = document.querySelector('.arrows__item--minute')
  const hoursArrow = document.querySelector('.arrows__item--hour')

  const currentTime = document.querySelector('.date__item--time')
  const currentDate = document.querySelector('.date__item--date')
  const currentYear = document.querySelector('.date__item--year')

  const now = new Date()

  let seconds = now.getSeconds()
  const secondsDegrees = ((seconds / 60) * 360) + 90
  secondsArrow.style.transform = `rotate(${secondsDegrees}deg)`

  let mins = now.getMinutes()
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90
  minutesArrow.style.transform = `rotate(${minsDegrees}deg)`

  let hour = now.getHours()
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90
  hoursArrow.style.transform = `rotate(${hourDegrees}deg)`

  if (hour < 10) {
    hour = '0' + hour
  }

  if (mins < 10) {
    mins = '0' + mins
  }

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  currentTime.textContent = hour + ' : ' + mins + ' : ' + seconds
  currentDate.textContent = now.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})
  currentYear.textContent = now.getFullYear()
}

setDate()
setInterval(setDate, 1000)

// - *** WEATHER ***
async function getWeather() {
  const weatherIcon = document.querySelector('.weather__icon')
  const weatherTemp = document.querySelector('.weather__deg')
  const weatherDescr = document.querySelector('.weather__item--descr')
  const weatherCity = document.querySelector('.weather__item--city')

  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=7659a54ea9aee259db3ae686f2dd1373&units=metric'
  const weatherRes = await fetch(weatherUrl)
  const weatherData = await weatherRes.json()

  weatherIcon.className = 'weather__icon owf'
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`)

  weatherTemp.textContent = `${weatherData.main.temp.toFixed(0)}°C`
  weatherDescr.textContent = `Feels like ${Math.round(weatherData.main.feels_like)}°C, wind ${weatherData.wind.speed.toFixed(1)}m/s`
  weatherCity.textContent = weatherData.name
}

document.addEventListener('DOMContentLoaded', getWeather)
setInterval(getWeather, 600000)

