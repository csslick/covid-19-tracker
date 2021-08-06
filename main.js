// API URL https://documenter.getpostman.com/view/10808728/SzS8rjbc#63fda84a-6b43-4506-9cc7-2172561d5c16

// 국가별 코로나 일별 누적 조회
const API_URL = `https://api.covid19api.com/total/dayone/country/`;
let myChart = null; // 챠트 객체 변수

function getCovidData(country) {
  fetch(`${API_URL}${country}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      showCovidData(data);  // 현황판
      showChart(data); // 추세그래프
    });
}  

function showCovidData(data) {
  // 국가(지역)
  const country = data[data.length-1].Country;
  // 격리자
  const active = data[data.length-2].Active;
  const activeDay = data[data.length-2].Active - data[data.length-3].Active;;
  // 사망자
  const deaths = data[data.length-2].Deaths;
  const deathsDay = data[data.length-2].Deaths - data[data.length-3].Deaths;
  // 격리해제
  const recovered = data[data.length-2].Recovered;
  const recoveredDay = data[data.length-2].Recovered - data[data.length-3].Recovered;;
  // 확진자
  const confirmed = data[data.length-2].Confirmed;
  const confirmedDay = data[data.length-2].Confirmed - data[data.length-3].Confirmed;
  const date = data[data.length-2].Date.slice(0, 10);
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

function showChart(cdata) {
  // 날짜라벨
  const labels = [
    cdata[cdata.length-8].Date.slice(5, 10), 
    cdata[cdata.length-7].Date.slice(5, 10), 
    cdata[cdata.length-6].Date.slice(5, 10), 
    cdata[cdata.length-5].Date.slice(5, 10), 
    cdata[cdata.length-4].Date.slice(5, 10), 
    cdata[cdata.length-3].Date.slice(5, 10), 
    cdata[cdata.length-2].Date.slice(5, 10)
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: '최근 일주간 코로나 확진자 추이(일별)',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
    }]
  };

  // 최근 일주간 추이
  for(let i = cdata.length-8; i <= cdata.length - 2;  i++)  {
    console.log(`${i} = ${cdata[i].Confirmed}`)
    data.datasets[0].data.push(cdata[i].Confirmed - cdata[i - 1].Confirmed)
  }
  console.log('data = ' +  data.datasets[0].data);

  const config = {
    type: 'line',
    data,
    options: {}
  };

  myChart = new Chart(document.getElementById('myChart'), config);
}

// 이벤트
const dropdown = document.getElementById('dropdown');

dropdown.addEventListener('change', function(){
  const country = this.value;
  console.log(country);
  myChart.destroy();  // 차트 초기화
  getCovidData(country);
});


getCovidData('south-korea')

