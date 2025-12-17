<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
        <span class="gradient-text dark:text-primary-400">Contact Us</span>
      </h1>

      <!-- Success Message -->
      <div v-if="showSuccess"
           class="fixed top-6 right-6 glass-strong bg-green-500/20 border-green-500/30 text-green-700 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-glass-lg z-50 animate-slide-up"
           role="alert">
        <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-semibold">Your message has been sent successfully!</span>
        <button @click="showSuccess = false" class="ml-4 hover:scale-110 transition-transform p-1 rounded-lg hover:bg-green-500/10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="showError"
           class="fixed top-6 right-6 glass-strong bg-red-500/20 border-red-500/30 text-red-700 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-glass-lg z-50 animate-slide-up"
           role="alert">
        <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-semibold">An error occurred. Please try again.</span>
        <button @click="showError = false" class="ml-4 hover:scale-110 transition-transform p-1 rounded-lg hover:bg-red-500/10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="handleSubmit" class="glass-card space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-dark-gray dark:text-gray-200 font-semibold mb-3 text-lg">Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="glass-input w-full"
              :class="{ 'ring-2 ring-red-500 border-red-500': errors.name }"
              placeholder="Your name"
            />
            <p v-if="errors.name" class="text-red-600 text-sm mt-2 font-medium">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-dark-gray dark:text-gray-200 font-semibold mb-3 text-lg">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="glass-input w-full"
              :class="{ 'ring-2 ring-red-500 border-red-500': errors.email }"
              placeholder="your.email@example.com"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-2 font-medium">{{ errors.email }}</p>
          </div>

          <!-- Subject Field -->
          <div>
            <label for="subject" class="block text-dark-gray dark:text-gray-200 font-semibold mb-3 text-lg">Subject</label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              class="glass-input w-full"
              :class="{ 'ring-2 ring-red-500 border-red-500': errors.subject }"
              placeholder="What's this about?"
            />
            <p v-if="errors.subject" class="text-red-600 text-sm mt-2 font-medium">{{ errors.subject }}</p>
          </div>

          <!-- Message Field -->
          <div>
            <label for="message" class="block text-dark-gray dark:text-gray-200 font-semibold mb-3 text-lg">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              class="glass-input w-full resize-none"
              :class="{ 'ring-2 ring-red-500 border-red-500': errors.message }"
              placeholder="Tell us about your project or inquiry..."
            ></textarea>
            <p v-if="errors.message" class="text-red-600 text-sm mt-2 font-medium">{{ errors.message }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="glass-button w-full"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center gap-3">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              Send Message
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// EmailJS configuration from environment variables
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Debug log to check environment variables
console.log('EmailJS Config:', {
  serviceId,
  templateId,
  publicKey: publicKey ? 'Set' : 'Not Set'
})

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
    // Send email using EmailJS
    const templateParams = {
      from_name: form.value.name,
      from_email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
      to_name: 'Grand Kru Technologies', // Recipient name
      reply_to: form.value.email // Set reply-to header
    }

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

    if (response.status === 200) {
      // Reset form
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }

      // Show success message
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