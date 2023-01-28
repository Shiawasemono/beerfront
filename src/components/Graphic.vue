<template>
  <div id="chart">
  </div>
</template>

<script>
import axios from 'axios'
import ApexCharts from 'apexcharts'
export default {
  props: ['name', 'info'],
  data: function() {
    return {
      seriesGravity: [],
      seriesTemp: [],
    };
  },

  async created() {
    const test = await axios.get("http://hestia:8080/historical/"+this.name+"/"+this.info)
    let allData = test.data
    this.createChart(allData.length, allData)
  },

  methods: {
    platoToSG (value) {
      return 259 / (259 - value)
    },
    createChart(count, ydata) {
      var i = 0;
      var seriesGra = [];
      var seriesTem = [];
      var seriesT = [];
      while (i < count) {
        var x = ydata[i].datetime
        var yt = ydata[i].temperature.toFixed(1)
        var yg = this.platoToSG(ydata[i].gravity).toFixed(4)

        seriesTem.push(yt)
        seriesGra.push(yg)
        seriesT.push(x)
        i++;
      }
      var options = {
        chart: {
          width: 600,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#ff8200", "#38b800"],
        series: [
          {
            name: "Gravity",
            data: seriesGra
          },
          {
            name: "Temperature",
            data: seriesTem
          }
        ],
        stroke: {
          curve: "straight"
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: seriesT,
          type: 'datetime'
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#ff8200"
            },
            min: 0.8,
            max: 1.4,
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#38b800"
            },
            min: 0,
            max: 40,
          }
        ],
        tooltip: {
          x: {
            show: false
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();

    }
  }
};
</script>

<style scoped>
#chart1,
#chart2 {
  max-width: 650px;
  margin: 35px auto;
}

#chart2 {
  position: relative;
  margin-top: -70px;
  margin-bottom: 0px;
}

#app {
  padding-top: 20px;
  padding-left: 10px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  margin: 35px auto;
}
</style>
