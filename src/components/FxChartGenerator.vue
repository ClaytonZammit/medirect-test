<template>
  <div class="chart-generator">
    <LineChartGenerator :options="chartOptions" :data="chartData">Chart couldn't be loaded.</LineChartGenerator>
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
    data: { type: Array, required: true }
  },
  data() {
    return {
      labels: [],
      datasets: [],
      chartOptions: null
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.datasets
      };
    }
  },
  watch: {
    data(value) {
      if (value.length > 0) {
        this.chartOptions = {
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  return Number(context.raw).toFixed(5);
                },
                title: (context) => {
                  const date = new Date(value[context[0].dataIndex].t);
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
        this.labels = value.map((result) => {
          const date = new Date(result.t);
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          });
        });
        this.datasets = [
          {
            backgroundColor: 'rgba(59, 113, 202, 0.2)',
            borderColor: '#3b71ca',
            data: value.map((result) => result.c),
            fill: true,
            label: 'Close Price',
            tension: 0.2
          }
        ];
      }
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
