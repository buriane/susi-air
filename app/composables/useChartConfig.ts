import { format } from 'date-fns'
import type { ChartBound } from '~/types/flightHours'
import type { Plugin } from 'chart.js'

/**
 * Build Chart.js configuration for a given toggle's chart bounds and data points.
 */
export function buildChartConfig(
  dataPoints: { date: Date; dateStr: string; value: number }[],
  bound: ChartBound,
  today: Date
) {
  const todayStr = format(today, 'yyyy-MM-dd')

  const labels = dataPoints.map((p) => {
    const d = format(p.date, 'dd MMM')
    return p.dateStr === todayStr ? `${d} ●` : d
  })

  const values = dataPoints.map((p) => p.value)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Rolling Hours',
        data: values,
        borderColor: '#22C5E8',
        backgroundColor: 'rgba(34, 197, 232, 0.08)',
        borderWidth: 2.5,
        pointRadius: dataPoints.map((p) =>
          p.dateStr === todayStr ? 5 : 3
        ),
        pointBackgroundColor: dataPoints.map((p) =>
          p.dateStr === todayStr ? '#22C5E8' : '#FFFFFF'
        ),
        pointBorderColor: '#22C5E8',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#0E2138',
        titleFont: {
          family: "'Inter', 'Plus Jakarta Sans', sans-serif",
          size: 12,
        },
        bodyFont: {
          family: "'Inter', 'Plus Jakarta Sans', sans-serif",
          size: 13,
          weight: 'bold' as const,
        },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) => {
            return `${(ctx.parsed.y ?? 0).toFixed(1)} hrs`
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', 'Plus Jakarta Sans', sans-serif",
            size: 10,
          },
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 0,
        },
        border: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        min: 0,
        max: bound.max,
        grid: {
          color: 'rgba(107, 114, 128, 0.08)',
        },
        ticks: {
          font: {
            family: "'Inter', 'Plus Jakarta Sans', sans-serif",
            size: 11,
            weight: 500,
          },
          color: '#6B7280',
          stepSize: calculateStepSize(bound.max),
        },
        border: {
          display: false,
        },
      },
    },
  }

  return { chartData, chartOptions }
}

/**
 * Calculate a sensible step size for the Y-axis based on max value.
 */
function calculateStepSize(max: number): number {
  if (max <= 50) return 10
  if (max <= 150) return 25
  if (max <= 350) return 50
  if (max <= 700) return 100
  return 250
}

/**
 * Chart.js plugin to draw a horizontal limit line.
 */
export function createLimitLinePlugin(limitValue: number): Plugin<'line'> {
  return {
    id: 'limitLine',
    beforeDraw(chart) {
      const yScale = chart.scales['y']
      const { ctx, chartArea } = chart
      if (!chartArea || !yScale) return

      const yPixel = yScale.getPixelForValue(limitValue)

      ctx.save()
      ctx.beginPath()
      ctx.setLineDash([6, 4])
      ctx.strokeStyle = '#E63757'
      ctx.lineWidth = 1.5
      ctx.moveTo(chartArea.left, yPixel)
      ctx.lineTo(chartArea.right, yPixel)
      ctx.stroke()

      ctx.fillStyle = '#E63757'
      ctx.font = "600 10px 'Inter', sans-serif"
      ctx.textAlign = 'right'
      ctx.fillText(`LIMIT ${limitValue}h`, chartArea.right, yPixel - 6)
      ctx.restore()
    },
  }
}
