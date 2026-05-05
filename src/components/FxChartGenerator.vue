<template>
  <div class="chart-generator">
    <LineChartGenerator :options="options" :data="data">Chart couldn't be loaded.</LineChartGenerator>
  </div>
</template>

<script>
import { Chart as ChartJS, Filler, Legend, Tooltip, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line as LineChartGenerator } from 'vue-chartjs';

ChartJS.register(Filler, Legend, Tooltip, CategoryScale, LinearScale, LineElement, PointElement);

export default {
  name: 'FxChartGenerator',
  components: {
    LineChartGenerator
  },
  props: {
    chartData: { type: Array, required: true }
  },
  data() {
    return {
      datasets: [],
      labels: [],
      options: null
    };
  },
  computed: {
    data() {
      return {
        datasets: this.datasets,
        labels: this.labels
      };
    }
  },
  watch: {
    chartData(value) {
      if (value.length > 0) {
        this.datasets = this.getChartDatasets();
        this.labels = this.getChartLabels();
        this.options = this.getChartOptions();
      }
    }
  },
  methods: {
    getChartDatasets() {
      return [
        {
          backgroundColor: 'rgba(59, 113, 202, 0.2)',
          borderColor: '#3b71ca',
          data: this.chartData.map((result) => result.c),
          fill: true,
          label: 'Close Price',
          pointHoverRadius: 5,
          pointRadius: 4,
          tension: 0.2
        }
      ];
    },
    getChartLabels() {
      return this.chartData.map((result) => {
        const date = new Date(result.t);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        });
      });
    },
    getChartOptions() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            onClick: () => null
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return Number(context.raw).toFixed(5);
              },
              title: (context) => {
                const date = new Date(this.chartData[context[0].dataIndex].t);
                return date.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
              }
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            ticks: {
              font: { size: 10 }
            }
          },
          y: {
            ticks: {
              callback: function (value) {
                return Number(value).toFixed(5);
              },
              font: { size: 10 }
            }
          }
        }
      };
    }
  }
};
</script>

<style lang="scss">
@use '~@/../../assets/styles/variables' as *;

.chart-generator {
  background-color: $white-color;
  border-radius: 10px;
  height: 300px;
}

@media (min-width: 992px) {
  .chart-generator {
    height: 350px;
  }
}

@media (min-width: 1200px) {
  .chart-generator {
    height: 400px;
  }
}
</style>
