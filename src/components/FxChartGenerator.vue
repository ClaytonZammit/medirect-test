<template>
  <div class="chart-generator">
    <LineChartGenerator :options="options" :data="data" ref="chart">Chart couldn't be loaded.</LineChartGenerator>
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
  computed: {
    data() {
      return {
        datasets: this.datasets,
        labels: this.labels
      };
    },
    datasets() {
      if (this.chartData?.length > 0) {
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
      }

      return [];
    },
    labels() {
      if (this.chartData?.length > 0) {
        return this.chartData.map((result) => {
          const date = new Date(result.t);
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          });
        });
      }

      return [];
    },
    options() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            onClick: () => null
          },
          tooltip: {
            callbacks: {
              label: (context) => Number(context.raw).toFixed(5),
              title: (context) => {
                if (this.chartData?.length > 0) {
                  const date = new Date(this.chartData[context[0].dataIndex].t);
                  return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                }

                return '';
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
              callback: (value) => (isNaN(Number(value)) ? '0.00000' : Number(value).toFixed(5)),
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

@media (min-width: 768px) {
  .chart-generator {
    height: 400px;
  }
}
</style>
