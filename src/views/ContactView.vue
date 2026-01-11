<template>
  <div class="min-h-screen bg-builder-dark-primary">
    <!-- Hero Section -->
    <section class="bg-builder-dark-primary py-20 border-b border-builder-border-default">
      <div class="container mx-auto px-6">
        <div class="max-w-content mx-auto text-center">
          <h1 class="mb-4 text-builder-foreground-primary">Contact Us</h1>
          <p class="text-lg leading-normal text-builder-foreground-secondary max-w-2xl mx-auto">
            Get in touch with us to discuss your technology needs
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-20 bg-builder-dark-primary">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto">
          <!-- Success Message -->
          <div
            v-if="showSuccess"
            class="fixed top-4 right-4 bg-builder-success text-white rounded-lg p-4 shadow-lg flex items-center gap-3 z-50 max-w-md"
            role="alert"
          >
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm">Your message has been sent successfully!</span>
            <button @click="showSuccess = false" class="ml-auto hover:opacity-70 transition-opacity">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Error Message -->
          <div
            v-if="showError"
            class="fixed top-4 right-4 bg-error text-white rounded-md p-4 shadow-lg flex items-center gap-3 z-50 max-w-md"
            role="alert"
          >
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm">An error occurred. Please try again.</span>
            <button @click="showError = false" class="ml-auto hover:opacity-70 transition-opacity">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="bg-builder-dark-primary border border-builder-border-default rounded-md p-8 space-y-6">
            <!-- Name Field -->
            <div>
              <label for="name" class="form-label block mb-2">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="form-input w-full"
                :class="{ 'border-error': errors.name }"
                placeholder="Your name"
              />
              <p v-if="errors.name" class="text-error text-sm mt-1">{{ errors.name }}</p>
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="form-label block mb-2">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-input w-full"
                :class="{ 'border-error': errors.email }"
                placeholder="your.email@example.com"
              />
              <p v-if="errors.email" class="text-error text-sm mt-1">{{ errors.email }}</p>
            </div>

            <!-- Subject Field -->
            <div>
              <label for="subject" class="form-label block mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                class="form-input w-full"
                :class="{ 'border-error': errors.subject }"
                placeholder="What is this regarding?"
              />
              <p v-if="errors.subject" class="text-error text-sm mt-1">{{ errors.subject }}</p>
            </div>

            <!-- Message Field -->
            <div>
              <label for="message" class="form-label block mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                class="form-input w-full resize-none"
                :class="{ 'border-error': errors.message }"
                placeholder="Tell us about your project or inquiry..."
              ></textarea>
              <p v-if="errors.message" class="text-error text-sm mt-1">{{ errors.message }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="glass-button w-full"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>
          </form>

          <!-- Contact Info -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-h5 mb-2 text-builder-foreground-primary">Location</h3>
              <p class="text-sm text-builder-foreground-secondary">
               14th Street, Caltech<br>New Jersey, Alabama
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-h5 mb-2 text-builder-foreground-primary">Email</h3>
              <a href="mailto:email@example.com" class="text-sm text-builder-foreground-primary hover:text-builder-accent-primaryHover transition-colors duration-150">
                email@example.com
              </a>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-builder-dark-tertiary rounded-sm flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-builder-foreground-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 class="text-h5 mb-2 text-builder-foreground-primary">Phone</h3>
              <a href="tel:+10123456780" class="text-sm text-builder-foreground-primary hover:text-builder-accent-primaryHover transition-colors duration-150">
                +1 (012) 345-6780
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const validateForm = () => {
  errors.value = {}

  if (!form.value.name) {
    errors.value.name = 'Name is required'
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!form.value.subject) {
    errors.value.subject = 'Subject is required'
  }

  if (!form.value.message) {
    errors.value.message = 'Message is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    const templateParams = {
      from_name: form.value.name,
      from_email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
      to_name: 'Grand Kru Technologies',
      reply_to: form.value.email
    }

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

    if (response.status === 200) {
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      showSuccess.value = true
    } else {
      throw new Error('Email sending failed')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    showError.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>
