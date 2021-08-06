// API URL https://documenter.getpostman.com/view/10808728/SzS8rjbc#63fda84a-6b43-4506-9cc7-2172561d5c16

// 국가별 코로나 일별 누적 조회
const API_URL = `https://api.covid19api.com/total/dayone/country/`;

function getCovidData(country) {
  fetch(`${API_URL}${country}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      showCovidData(data);
    });
}  

function showCovidData(data) {
  // 국가(지역)
  const country = data[data.length-1].Country;
  // 격리자
  const active = data[data.length-1].Active;
  const activeDay = data[data.length-1].Active - data[data.length-2].Active;;
  // 사망자
  const deaths = data[data.length-1].Deaths;
  const deathsDay = data[data.length-1].Deaths - data[data.length-2].Deaths;
  // 격리해제
  const recovered = data[data.length-1].Recovered;
  const recoveredDay = data[data.length-1].Recovered - data[data.length-2].Recovered;;
  // 확진자
  const confirmed = data[data.length-1].Confirmed;
  const confirmedDay = data[data.length-1].Confirmed - data[data.length-2].Confirmed;
  const date = data[data.length-1].Date.slice(0, 10);
  console.log(country, active, deaths, recovered, confirmed, date);

  // DOM 엘리먼트 선택
  const countryEl = document.getElementById('country');
  const activeEl = document.getElementById('active');
  const deathsEl = document.getElementById('deaths');
  const recoveredEl = document.getElementById('recovered');
  const confirmedEl = document.getElementById('confirmed');
  const dateEl = document.getElementById('date');

  // DOM 엘리먼트에 데이터 추가
  countryEl.innerHTML = country;
  activeEl.innerHTML = activeDay.toLocaleString();
  deathsEl.innerHTML = deathsDay.toLocaleString();
  recoveredEl.innerHTML = recoveredDay.toLocaleString();
  confirmedEl.innerHTML = confirmedDay.toLocaleString();
  dateEl.innerHTML = date;
}  

// 이벤트
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', function(){
  const country = this.value;
  console.log(country);
  getCovidData(country);
});


getCovidData('south-korea')

