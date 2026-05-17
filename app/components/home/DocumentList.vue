<script setup lang="ts">
import { FileText, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-vue-next'
import { format, parseISO } from 'date-fns'
import { useDocumentsStore } from '~/stores/documents'
import { getExpiryStatus, getDaysRemaining } from '~/composables/useExpiryStatus'
import type { ExpiryStatus } from '~/types/document'

const documentsStore = useDocumentsStore()

const documentsWithStatus = computed(() =>
  documentsStore.documents.map((doc) => ({
    ...doc,
    status: getExpiryStatus(doc.expiryDate),
    daysRemaining: getDaysRemaining(doc.expiryDate),
    formattedDate: format(parseISO(doc.expiryDate), 'dd MMM yyyy'),
  }))
)

const badgeVariantMap: Record<ExpiryStatus, 'success' | 'warning' | 'danger'> = {
  green: 'success',
  amber: 'warning',
  red: 'danger',
}

const badgeLabelMap: Record<ExpiryStatus, string> = {
  green: 'Active',
  amber: 'Expiring Soon',
  red: 'Expired',
}

function formatDaysLabel(days: number): string {
  if (days <= 0) {
    return `${Math.abs(days)} days overdue`
  }
  return `${days} days left`
}

function getStatusIcon(status: ExpiryStatus) {
  if (status === 'green') return ShieldCheck
  if (status === 'amber') return ShieldAlert
  return ShieldX
}
</script>

<template>
  <section class="document-list">
    <h2 class="document-list__title">
      <FileText :size="18" :stroke-width="1.75" />
      Document Status
    </h2>

    <div class="document-list__items">
      <BaseCard
        v-for="doc in documentsWithStatus"
        :key="doc.id"
        class="document-list__item"
      >
        <div class="document-list__item-left">
          <div
            class="document-list__icon"
            :class="`document-list__icon--${doc.status}`"
          >
            <component :is="getStatusIcon(doc.status)" :size="18" :stroke-width="1.75" />
          </div>
          <div class="document-list__info">
            <p class="document-list__label">{{ doc.label }}</p>
            <p class="document-list__date">{{ doc.formattedDate }}</p>
          </div>
        </div>

        <div class="document-list__item-right">
          <BaseBadge :variant="badgeVariantMap[doc.status]">
            {{ badgeLabelMap[doc.status] }}
          </BaseBadge>
          <span
            class="document-list__days"
            :class="`document-list__days--${doc.status}`"
          >
            {{ formatDaysLabel(doc.daysRemaining) }}
          </span>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.document-list {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $font-size-headline;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
  }

  &__item-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex: 1;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    flex-shrink: 0;

    &--green {
      background: rgba($color-success, 0.12);
      color: $color-success;
    }

    &--amber {
      background: rgba($color-warning, 0.12);
      color: $color-warning;
    }

    &--red {
      background: rgba($color-danger, 0.12);
      color: $color-danger;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__label {
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date {
    font-size: $font-size-label;
    color: $color-text-secondary;
    line-height: 1.4;
  }

  &__item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
    margin-left: 8px;
  }

  &__days {
    font-size: 11px;
    font-weight: $font-weight-medium;
    line-height: 1.3;

    &--green {
      color: $color-success;
    }

    &--amber {
      color: $color-warning;
    }

    &--red {
      color: $color-danger;
    }
  }
}
</style>
