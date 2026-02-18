<template>
  <div class="mb-3">
    <label class="form-label" style="display: block; text-align: start">
      {{ label }} <span class="text-danger">{{ unOptional ? '*' : ''}}</span>
    </label>
    <div v-if="type === 'file'">
      <BaseButton
        icon="download"
        label="Upload"
        class="upload-link"
        @click="$refs.fileInput.click()"
        >{{ btnImage }}
      </BaseButton>
      <input
        ref="fileInput"
        type="file"
        @change="onFileChange"
        class="form-control"
        :class="{ 'is-invalid': error }"
        hidden
      />
      <div class="d-inline ms-2 p-2" v-if="cropFileName">
        {{ shortFileName }}
      </div>
      <div
        v-if="fileName"
        class="p-1 border rounded-2 mt-3"
        style="width: 300px; height: 200px"
      >
        <img
          class="object-fit-cover"
          width="100%"
          height="100%"
          :src="fileName"
          alt=""
        />
      </div>
    </div>

    <div v-else class="position-relative">
      <input
        class="form-control pe-5"
        :class="{ 'is-invalid': error }"
        :type="computedType"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
      />

      <!-- Eye Icon -->
      <i
        v-if="type === 'password'"
        class="bi position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
        :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
        @click="togglePassword"
      ></i>
      <div v-if="error" class="invalid-feedback" style="text-align: start">{{ error }}</div>
    </div>
    <div v-if="error" class="invalid-feedback" style="text-align: start">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseButton from './BaseButton.vue';
const fileName = ref('');
const shortFileName = ref('');
const cropFileName = (name, max = 15) => {
  const dot = name.lastIndexOf('.');
  const ext = dot !== -1 ? name.slice(dot) : '';
  const base = dot !== -1 ? name.slice(0, dot) : name;

  return base.length > max ? base.slice(0, max) + '...' + ext : base + ext;
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  fileName.value = URL.createObjectURL(file);
  shortFileName.value = cropFileName(file.name, 15);
  // send the actual file object to parent
  emit('update:modelValue', file);
};

const props = defineProps({
  modelValue: { type: [String, Number, Object], default: '' },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  btnImage: {
    type: String,
    default: '',
  },
  unOptional: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'input', 'change']);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
  emit('input');
  emit('change');
};

const showPassword = ref(false);

const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<!-- How to use Base input -->
<!-- <form action="" @submit.prevent="onSubmit" class="p-4 border rounded-4">
    <BaseInput type="file" label="Thumbnail" btnImage="Upload Image"></BaseInput>
    <BaseInput type="text" label="Name" placeholder="Enter your name" error="Name Invalid"></BaseInput>
</form> -->

<style scoped>
.upload-link {
  color: rgb(255, 255, 255);
  text-decoration: underline;
  cursor: pointer;
}

.form-control {
  outline: none;
  box-shadow: none;
  /* border: 1px solid #d1d5db; */
  border: 1px solid var(--tertiary-color);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* Focus state */
.form-control:focus {
  border-color: var(--primary-color); /* primary */
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
  outline: none;
}

.cursor-pointer {
  cursor: pointer;
  font-size: 18px;
  color: #6c757d;
}

.cursor-pointer:hover {
  color: var(--primary-color);
}
</style>
