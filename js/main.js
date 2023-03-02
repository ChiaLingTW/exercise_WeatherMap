let myKey = "CWB-AEA46F7D-DA9B-4A15-AB22-F9A6F8C60DF4"
let url = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=${myKey}&downloadType=WEB&format=JSON`

var paths;
let app = Vue.createApp({
    mounted(){
        axios.get(url).then(data => {
            console.log(data)
            this.weather_data = data.data.cwbopendata.dataset.locations.location
        })

        paths = document.querySelectorAll('path');
        let _this = this
        paths.forEach(e => {
            e.onmouseover = function () {
                _this.filter = this.dataset.nameZh
            }
        })
    },

    data: () => {
        return {
            filter: '',
            weather_data: []
        }
    },

    computed: {
        showNew() {
            let data = {}
            let result = this.weather_data.find((obj) => {
                return obj.locationName === this.filter
            })

            if (result) {
                let high = result.weatherElement.find(el => el.elementName === 'MaxT').time[0].elementValue.value
                let low = result.weatherElement.find(el => el.elementName === 'MinT').time[0].elementValue.value
                let rain = result.weatherElement.find(el => el.elementName === 'PoP12h').time[0].elementValue.value
                let weather = result.weatherElement.find(el => el.elementName === 'Wx').time[0].elementValue[0].value
                data = {
                    location: this.filter,
                    low: low + "℃～",
                    high: high + "℃",
                    rain: "降雨率 " + rain + "％",
                    weather: weather
                }
            }
            return data
        }
    },
})

app.mount('#appWeather')


let place_data = [
    {
        tag: "taichung_city",
        location: "台中市",
        low: 15,
        high: 22,
        rain: 45,
        weather: "毛毛細雨"
    },
    {
        tag: "changhua_country",
        location: "彰化縣",
        low: 15,
        high: 22,
        rain: 40,
        weather: "毛毛細雨"
    },
    {
        tag: "yunlin_country",
        location: "雲林縣",
        low: 15,
        high: 22,
        rain: 20,
        weather: "晴時多雲"
    },
    {
        tag: "chiayi_country",
        location: "嘉義縣",
        low: 16,
        high: 23,
        rain: 20,
        weather: "晴時多雲"
    },
    {
        tag: "chiayi_city",
        location: "嘉義市",
        low: 16,
        high: 23,
        rain: 20,
        weather: "晴時多雲"
    },
    {
        tag: "tainan_city",
        location: "台南市",
        low: 17,
        high: 26,
        rain: 0,
        weather: "天晴無雲"
    },
    {
        tag: "kaohsiung_city",
        location: "高雄市",
        low: 18,
        high: 28,
        rain: 0,
        weather: "天晴無雲"
    },
    {
        tag: "pingtung_country",
        location: "屏東縣",
        low: 18,
        high: 28,
        rain: 0,
        weather: "艷陽高照"
    }
]


// const el_taichung_city = document.getElementById("TWN1174")
// el_taichung_city.onmouseover = function () {
//     console.log("taichung_city")
// }

// const el_changhua_country = document.getElementById("TWN1169")
// el_changhua_country.onmouseover = function () {
//     console.log("changhua_country")
// }