<template>
  <div class="min-h-screen bg-white py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-primary text-center mb-12">Contact Us</h1>

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

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({})
const isSubmitting = ref(false)

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

  try {
    // In a real application, you would send the form data to your backend
    // For now, we'll just simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    // Show success message
    alert('Message sent successfully!')
  } catch (error) {
    alert('An error occurred. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>