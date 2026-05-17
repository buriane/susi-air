export type ExpiryStatus = 'green' | 'amber' | 'red'

export interface DocumentThresholds {
  warningDays: number
  comment: string
}

export interface PilotDocument {
  id: string
  label: string
  expiryDate: string
}

export interface DocumentsMock {
  today: string
  thresholds: DocumentThresholds
  documents: PilotDocument[]
}
