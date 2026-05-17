<script setup lang="ts">
import { Newspaper, ArrowRight } from 'lucide-vue-next'

interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  category: string
}

const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'New SOP for Mountain Approach',
    summary: 'Updated standard operating procedures for mountain airstrip approaches effective June 2026.',
    date: 'May 30, 2026',
    category: 'Operations',
  },
  {
    id: 'news-2',
    title: 'Fuel Surcharge Adjustment',
    summary: 'Fuel surcharge rates have been adjusted following recent fuel price changes across Papua region.',
    date: 'May 28, 2026',
    category: 'Finance',
  },
  {
    id: 'news-3',
    title: 'Pilot Recurrent Training Schedule',
    summary: 'Q3 2026 recurrent training schedule is now available. Check your assigned dates.',
    date: 'May 25, 2026',
    category: 'Training',
  },
]
</script>

<template>
  <section class="latest-news">
    <div class="latest-news__header">
      <h2 class="latest-news__title">
        <Newspaper :size="18" :stroke-width="1.75" />
        Latest News
      </h2>
      <button class="latest-news__see-all">
        See All
        <ArrowRight :size="14" :stroke-width="2" />
      </button>
    </div>

    <div class="latest-news__scroll-container">
      <div class="latest-news__scroll">
        <BaseCard
          v-for="item in newsItems"
          :key="item.id"
          class="latest-news__card"
        >
          <div class="latest-news__card-header">
            <BaseBadge variant="neutral">{{ item.category }}</BaseBadge>
            <span class="latest-news__card-date">{{ item.date }}</span>
          </div>
          <h3 class="latest-news__card-title">{{ item.title }}</h3>
          <p class="latest-news__card-summary">{{ item.summary }}</p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.latest-news {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $font-size-headline;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }

  &__see-all {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: $font-size-label;
    font-weight: $font-weight-medium;
    color: $color-red;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__scroll-container {
    margin-left: -16px;
    margin-right: -16px;
    overflow: hidden;
  }

  &__scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-left: 16px;
    scroll-padding-right: 16px;
    -webkit-overflow-scrolling: touch;
    padding: 4px 16px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__card {
    flex-shrink: 0;
    width: 260px;
    scroll-snap-align: start;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  &__card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__card-date {
    font-size: $font-size-label;
    color: $color-text-secondary;
  }

  &__card-title {
    font-size: $font-size-body;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__card-summary {
    font-size: $font-size-label;
    color: $color-text-secondary;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
