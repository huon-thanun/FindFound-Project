<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6 slider-wrapper">
        <!-- Main slider -->
        <Swiper
          :spaceBetween="10"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          class="mySwiper2"
        >
          <!-- <SwiperSlide v-for="n in 10" :key="'main-' + n">
            <img :src="`https://swiperjs.com/demos/images/nature-${n}.jpg`" />
          </SwiperSlide> -->
          <SwiperSlide
            v-for="image in reportStore.report.reportImages"
            :key="image.id"
          >
            <img :src="image.name" />
          </SwiperSlide>
        </Swiper>

        <!-- Thumbnail slider -->
        <Swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          :slidesPerView="4"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper mt-2"
        >
          <SwiperSlide
            v-for="image in reportStore.report.reportImages"
            :key="image.id"
          >
            <img :src="image.name" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Swiper modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useReportStore } from "@/stores/reportStore";

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [FreeMode, Navigation, Thumbs];

//load data

const reportStore = useReportStore();
const loadReport = async (id) => {
  try {
    await Promise.all([reportStore.getReportById(id)]);
    console.log(reportStore.report);
  } catch (error) {
    console.error(error);
  }
};

// first load
onMounted(() => {
  loadReport(78);
});
</script>

<style scoped>
.slider-wrapper {
  width: 100%;
  max-width: 100%;
}

.mySwiper,
.mySwiper2 {
  width: 100%;
}

.mySwiper img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid black;
}

.mySwiper2 img {
  width: 100%;
  height: 800px;
  object-fit: contain;
  border-radius: 12px;
}
</style>
