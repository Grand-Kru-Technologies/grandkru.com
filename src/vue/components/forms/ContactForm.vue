<template>
  <form @submit.prevent="handleSubmit" class="gkt-contact-form">
    <div class="row">
      <div class="col-12 col-md-6 mb-3">
        <input
          v-model="formData.from_name"
          type="text"
          class="form-control form-control-lg"
          :placeholder="strings.get('name')"
          required
        />
      </div>
      <div class="col-12 col-md-6 mb-3">
        <input
          v-model="formData.from_email"
          type="email"
          class="form-control form-control-lg"
          :placeholder="strings.get('email')"
          required
        />
      </div>
    </div>
    <div class="mb-3">
      <input
        v-model="formData.custom_subject"
        type="text"
        class="form-control form-control-lg"
        :placeholder="strings.get('subject')"
        required
      />
    </div>
    <div class="mb-4">
      <textarea
        v-model="formData.message"
        class="form-control form-control-lg"
        :placeholder="strings.get('message')"
        rows="5"
        required
      ></textarea>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-primary btn-lg px-5" :disabled="isSubmitting">
        <span v-if="isSubmitting">
          <i class="fas fa-spinner fa-spin me-2" />
          {{ strings.get("sending_message") }}
        </span>
        <span v-else>
          <i class="fas fa-paper-plane me-2" />
          {{ strings.get("send") }}
        </span>
      </button>
    </div>

    <div v-if="submitStatus" class="mt-4 text-center">
      <div v-if="submitStatus === 'success'" class="alert alert-success">
        <h5 v-html="utils.parseCustomText(strings.get('contact_thank_you'))" />
        <p>{{ strings.get("contact_thank_you_description") }}</p>
      </div>
      <div v-else-if="submitStatus === 'error'" class="alert alert-danger">
        {{ strings.get("error_sending_message") }}
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useStrings } from "@/composables/strings";
import { useUtils } from "@/composables/utils";
import { useEmails } from "@/composables/emails";

const strings = useStrings();
const utils = useUtils();
const emails = useEmails();

const formData = reactive({
  from_name: "",
  from_email: "",
  custom_subject: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref<"success" | "error" | null>(null);

const handleSubmit = async (): Promise<void> => {
  if (!utils.isValidEmail(formData.from_email)) {
    alert(strings.get("error_invalid_email"));
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const success = await emails.sendEmail(formData);
    submitStatus.value = success ? "success" : "error";

    if (success) {
      formData.from_name = "";
      formData.from_email = "";
      formData.custom_subject = "";
      formData.message = "";
    }
  } catch {
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.gkt-contact-form {
  .form-control {
    border: 2px solid $light-3;
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: $primary;
      box-shadow: 0 0 0 0.2rem rgba($primary, 0.15);
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, $primary, darken($primary, 10%));
    border: none;
    border-radius: 50px;
    font-weight: 600;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba($primary, 0.3);
    }

    &:disabled {
      opacity: 0.7;
    }
  }
}
</style>
