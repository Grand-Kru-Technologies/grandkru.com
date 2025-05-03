module.exports = {
  Carousel: {
    name: 'Carousel',
    template: '<div><slot /><slot name="addons" /></div>'
  },
  Slide: {
    name: 'Slide',
    template: '<div><slot /></div>'
  },
  Pagination: {
    name: 'Pagination',
    template: '<div />'
  },
  Navigation: {
    name: 'Navigation',
    template: '<div />'
  }
};