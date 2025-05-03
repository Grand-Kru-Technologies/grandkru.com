<template>
  <div class="min-h-screen bg-white py-16">
    <div class="container mx-auto px-4">
      g

      <!-- Success Message -->
      <div v-if="showSuccess" class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline"> Your message has been sent successfully.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="showSuccess = false">
          <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>

      <!-- Error Message -->
      <div v-if="showError" class="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> An error occurred. Please try again.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="showError = false">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>

      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-dark-gray font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-dark-gray font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Subject Field -->
          <div>
            <label for="subject" class="block text-dark-gray font-medium mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              class="w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              :class="{ 'border-red-500': errors.subject }"
            />
            <p v-if="errors.subject" class="text-red-500 text-sm mt-1">{{ errors.subject }}</p>
          </div>

          <!-- Message Field -->
          <div>
            <label for="message" class="block text-dark-gray font-medium mb-2">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              :class="{ 'border-red-500': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

<<<<<<< HEAD
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
=======
// EmailJS configuration
const serviceId = 'YOUR_SERVICE_ID' // Replace with your EmailJS service ID
const templateId = 'YOUR_TEMPLATE_ID' // Replace with your EmailJS template ID
const publicKey = 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
>>>>>>> 253f602 (feat: setup staging environment with homepage, about, and contact pages)

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