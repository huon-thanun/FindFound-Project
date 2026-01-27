<template>
  <div class="mb-3">
    <label class="form-label"> {{ label }} </label>
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
      <div class="d-inline ms-2 p-2" v-if="cropFileName">{{ shortFileName }}</div>
      <div v-if="fileName" class="p-1 border rounded-2 mt-3" style="width: 300px; height: 200px">
        <img
          class=" object-fit-cover"
          width="100%"
          height="100%"
          :src="fileName"
          alt=""
        />
      </div>
    </div>

    <input
      v-else
      class="form-control"
      :class="{ 'is-invalid': error }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
    />

    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "./BaseButton.vue";
const fileName = ref("");
const shortFileName = ref("");
const cropFileName = (name, max = 15) => {
  const dot = name.lastIndexOf(".");
  const ext = dot !== -1 ? name.slice(dot) : "";
  const base = dot !== -1 ? name.slice(0, dot) : name;

  return base.length > max ? base.slice(0, max) + "..." + ext : base + ext;
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  fileName.value = URL.createObjectURL(file);
  shortFileName.value = cropFileName(file.name, 15);
  // send the actual file object to parent 
  emit("update:modelValue", file);
};

defineProps({
  modelValue: { type: [String, Number, Object], default: "" },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  btnImage:{
    type:String,
    default: "",
  }
});

const emit = defineEmits(["update:modelValue", "input", "change"]);

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
  emit("input");
  emit("change");
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
</style>