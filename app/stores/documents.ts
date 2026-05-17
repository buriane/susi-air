import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DocumentThresholds, PilotDocument, DocumentsMock } from '~/types/document'
import mockData from '~~/data/mock-documents.json'

export const useDocumentsStore = defineStore('documents', () => {
  const today = ref<string>('')
  const thresholds = ref<DocumentThresholds | null>(null)
  const documents = ref<PilotDocument[]>([])

  function load() {
    const data = mockData as DocumentsMock
    today.value = data.today
    thresholds.value = data.thresholds
    documents.value = data.documents
  }

  return { today, thresholds, documents, load }
})
