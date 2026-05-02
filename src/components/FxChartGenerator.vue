<template>
  <div class="chart-generator">
    <LineChartGenerator :options="chartOptions" :data="chartData">Chart couldn't be loaded.</LineChartGenerator>
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Filler, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';

ChartJS.register(Tooltip, Filler, LineElement, LinearScale, CategoryScale, PointElement);

export default {
  name: 'FxChartGenerator',
  components: {
    LineChartGenerator
  },
  props: ['data'],
  data() {
    return {
      labels: [],
      datasets: [],
      chartOptions: { maintainAspectRatio: false, responsive: true }
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
      if (value.results) {
        this.labels = value.results.map((result) => {
          const date = new Date(result.t);
          return date.toLocaleDateString('en-UK', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          });
        });
        this.datasets = [
          {
            backgroundColor: 'rgba(59, 113, 202, 0.2)',
            borderColor: '#3b71ca',
            data: value.results.map((result) => result.c),
            fill: true,
            tension: 0.2
          }
        ];
      }
    }
  }
};
</script>

<style lang="scss">
.chart-generator {
  height: 280px;
}

@media (min-width: 992px) {
  .chart-generator {
    height: 320px;
  }
}

@media (min-width: 1200px) {
  .chart-generator {
    height: 380px;
  }
}
</style>
