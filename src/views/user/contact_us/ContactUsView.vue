<template>
  <section class="contact-page py-5 bg-light">
    <div class="container py-5">
      <div class="row g-4 mb-5">
        <div
          class="col-md-6 col-lg-3"
          v-for="(info, index) in contactDetails"
          :key="index"
        >
          <div class="info-card-modern p-4 rounded-4 shadow-sm bg-white h-100">
            <div class="icon-box-style mb-3">
              <i :class="info.icon"></i>
            </div>
            <h6 class="khmer-font-title fw-bold mb-1">{{ info.title }}</h6>
            <p class="khmer-font text-muted small mb-0">{{ info.text }}</p>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div
            class="map-wrapper shadow-sm rounded-4 overflow-hidden h-100 border bg-white"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125063.4827185011!2d104.8322625914619!3d11.570020164627236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6d47%3A0xe2125633a693240!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000"
              width="100%"
              height="100%"
              style="border: 0; min-height: 450px"
              allowfullscreen=""
              loading="lazy"
            >
            </iframe>
          </div>
        </div>

        <div class="col-lg-6">
          <div
            class="form-wrapper shadow-sm rounded-4 p-4 p-md-5 bg-white border h-100"
          >
            <div class="form-header mb-4">
              <h3 class="khmer-font-title fw-bold">ផ្ញើសារមកយើង</h3>
              <p class="khmer-font text-muted small">
                សូមបំពេញព័ត៌មានខាងក្រោម ដើម្បីទាក់ទងមកក្រុមការងារបច្ចេកទេស។
              </p>
            </div>

            <form @submit.prevent="handleMessage">
              <div class="row g-3">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control-modern"
                    placeholder="ឈ្មោះរបស់អ្នក"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="email"
                    class="form-control-modern"
                    placeholder="អ៊ីមែល"
                  />
                </div>
                <div class="col-12">
                  <input
                    type="text"
                    class="form-control-modern"
                    placeholder="ប្រធានបទ"
                  />
                </div>
                <div class="col-12">
                  <textarea
                    class="form-control-modern"
                    rows="5"
                    placeholder="សាររបស់អ្នក..."
                  ></textarea>
                </div>
                <div class="col-12 mt-4">
                  <button
                    class="btn btn-submit-khmer w-100 py-3 rounded-3 fw-bold"
                  >
                    ផ្ញើសារឥឡូវនេះ
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactDetails = [
  { title: "ទីតាំង", text: "ភ្នំពេញ, ប្រទេសកម្ពុជា", icon: "bi bi-geo-alt" },
  { title: "អ៊ីមែល", text: "info@lostfound.kh", icon: "bi bi-envelope" },
  { title: "ទូរស័ព្ទ", text: "+855 12 345 678", icon: "bi bi-telephone" },
  { title: "ម៉ោងការងារ", text: "ចន្ទ - សុក្រ: 8AM - 5PM", icon: "bi bi-clock" },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;600&display=swap");

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
}
.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
}

/* Info Card Style */
.info-card-modern {
  border: 1px solid #edf2f7;
  transition: 0.3s;
}
.info-card-modern:hover {
  transform: translateY(-5px);
  border-color: #3b1e54;
}

.icon-box-style {
  width: 50px;
  height: 50px;
  background: #f4f0ff;
  color: #3b1e54;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Form Style */
.form-control-modern {
  width: 100%;
  padding: 14px 18px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-family: "Noto Sans Khmer", sans-serif;
  font-size: 0.95rem;
  transition: 0.3s;
}

.form-control-modern:focus {
  outline: none;
  background-color: #fff;
  border-color: #3b1e54;
  box-shadow: 0 0 0 4px rgba(59, 30, 84, 0.05);
}

/* Button Style */
.btn-submit-khmer {
  background-color: #3b1e54;
  color: white;
  border: none;
  font-family: "Noto Sans Khmer", sans-serif;
  transition: 0.3s;
}

.btn-submit-khmer:hover {
  background-color: #d4af37;
  color: #1e1b4b;
  transform: translateY(-2px);
}

@media (max-width: 991px) {
  .map-wrapper {
    height: 350px !important;
  }
}
</style>
