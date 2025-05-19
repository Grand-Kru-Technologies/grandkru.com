import type { Component } from 'vue'

type CarouselComponent = {
  name: string
  template: string
}

export const Carousel: CarouselComponent = {
  name: 'Carousel',
  template: '<div class="carousel"><slot /><slot name="addons" /></div>'
}

export const Slide: CarouselComponent = {
  name: 'Slide',
  template: '<div class="carousel__item"><slot /></div>'
}

export const Pagination: CarouselComponent = {
  name: 'Pagination',
  template: '<div class="carousel__pagination" />'
}

export const Navigation: CarouselComponent = {
  name: 'Navigation',
  template: '<div class="carousel__prev" />'
}