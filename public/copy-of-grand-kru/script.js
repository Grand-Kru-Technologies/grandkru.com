const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelector('.nav-links')
const yearSpan = document.getElementById('year')

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear()
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open')
    navToggle.setAttribute('aria-expanded', isOpen.toString())
  })

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open')
      navToggle.setAttribute('aria-expanded', 'false')
    })
  })
}

const contactForm = document.querySelector('.contact__form')
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault()
    alert('This is a static preview. Connect to a backend service to collect submissions.')
  })
}
