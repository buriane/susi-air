export type DutyStatus = 1 | 2
// 1 = pending/upcoming (logbook belum lengkap)
// 2 = completed/verified (logbook sudah lengkap)

export interface LegendItem {
  code: string
  label: string
  color: string
}

export interface ScheduleEntry {
  id: string
  duty_date: string
  status: DutyStatus
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
}

export interface SchedulesMock {
  today: string
  fieldGuide: Record<string, string>
  legend: LegendItem[]
  schedules: ScheduleEntry[]
}
