<template>
    <!-- Header Section -->
    <header class="header-section" id="support">
        <div class="container">
            <div class="text-center py-5">
                <h1 class="khmer-title mb-3">ជំនួយ និងគាំទ្រ</h1>
                <p class="lead">យើងនៅទីនេះដើម្បីជួយអ្នកគ្រប់ពេលវេលា</p>
                <div class="mt-3">
                    <span class="status-online"></span>
                    <span>សេវាកម្មជំនួយ៖ <strong>ប្រើការបាន</strong></span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container">
        <!-- Emergency Banner -->
        <div class="emergency-banner">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h4 class="khmer-title"><i class="bi bi-exclamation-triangle-fill me-2"></i> សំណួរបន្ទាន់ ឬបញ្ហាសំខាន់?</h4>
                    <p class="mb-0">ប្រសិនបើអ្នកមានបញ្ហាបន្ទាន់ ឬទំនិញបាត់ដែលមានតម្លៃខ្ពស់ សូមទាក់ទងយើងភ្លាមៗ។</p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <a href="tel:+85512345678" class="btn text-danger btn-light fs-6 btn-lg">
                        <i class="bi bi-telephone-outbound-fill me-2"></i> ទូរស័ព្ទបន្ទាន់
                    </a>
                </div>
            </div>
        </div>

        <!-- Support Options -->
        <div class="row mb-3">
            <div class="col-12 mb-4">
                <h2 class="khmer-title text-center mt-2 mb-4"><i class="bi bi-link-45deg me-2"></i>វិធីសាស្រ្តទំនាក់ទំនង</h2>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="support-card support-type-1 text-center p-4">
                    <div class="card-icon">
                        <i class="bi bi-chat-dots" style="color: #A855F7;"></i>
                    </div>
                    <h4 class="khmer-title">ជជែកផ្ទាល់</h4>
                    <p>ទាក់ទងជាមួយអ្នកគាំទ្រតាមរយៈការជជែកផ្ទាល់</p>
                    <button class="btn btn-success mt-2">
                        <a href="https://t.me/+g1rWjdjM5kcyNDRl" class="text-white text-decoration-none" target="blank">ចាប់ផ្តើមជជែក</a>
                    </button>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="support-card support-type-2 text-center p-4">
                    <div class="card-icon">
                        <i class="bi bi-telephone" style="color: #EC4899;"></i>
                    </div>
                    <h4 class="khmer-title">ទូរស័ព្ទ</h4>
                    <p>ទូរស័ព្ទមកកាន់ក្រុមជំនួយរបស់យើងបើមានបញ្ហាបន្ទាន់</p>
                    <a href="tel:+85512345678" class="btn btn-danger mt-2">
                        ចុចដើម្បីទូរស័ព្ទ
                    </a>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="support-card support-type-3 text-center p-4">
                    <div class="card-icon">
                        <i class="bi bi-envelope" style="color:#06B6D4"></i>
                    </div>
                    <h4 class="khmer-title">អ៊ីមែល</h4>
                    <p>ផ្ញើអ៊ីមែលមកយើង យើងនឹងឆ្លើយតបក្នុង ២៤ម៉ោង</p>
                    <button class="btn btn-info text-white mt-2" @click="scrollToContactForm">
                        ផ្ញើអ៊ីមែល
                    </button>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="support-card support-type-4 text-center p-4">
                    <div class="card-icon">
                        <i class="bi bi-question-circle" style="color: #F59E0B;"></i>
                    </div>
                    <h4 class="khmer-title">FAQ</h4>
                    <p>ស្វែងរកចម្លើយដោយខ្លួនឯងក្នុងផ្នែកសំណួរញឹកញាប់</p>
                    <button class="btn btn-warning mt-2" @click="goToFAQ">
                        <router-link to="/faq" class="text-decoration-none text-white">មើលសំណួរដែលសួរញឹកញាប់</router-link>
                    </button>
                </div>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="row mb-5" id="contact-form">
            <div class="col-lg-8 mx-auto">
                <div class="support-form">
                    <h2 class="khmer-title text-center mb-4"><i class="bi bi-pencil-square me-2"></i>ទំរង់ទាក់ទង</h2>
                    <p class="text-center mb-4">បំពេញទំរង់ខាងក្រោម ហើយយើងនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ</p>
                    
                    <form @submit.prevent="submitForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="name" class="form-label">ឈ្មោះពេញ <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="name" v-model="formData.name" required placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក">
                            </div>
                            
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">អាសយដ្ឋានអ៊ីមែល <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="email" v-model="formData.email" required placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក">
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                                <input type="tel" class="form-control" id="phone" v-model="formData.phone" placeholder="បញ្ចូលលេខទូរស័ព្ទរបស់អ្នក">
                            </div>
                            
                            <div class="col-md-6 mb-3">
                                <label for="category" class="form-label">ប្រភេទបញ្ហា <span class="text-danger">*</span></label>
                                <select class="form-select" id="category" v-model="formData.category" required>
                                    <option value="" selected disabled>ជ្រើសរើសប្រភេទបញ្ហា</option>
                                    <option value="technical">បញ្ហាបច្ចេកទេស</option>
                                    <option value="account">បញ្ហាគណនី</option>
                                    <option value="posting">បញ្ហាការបង្កើតប្រកាស</option>
                                    <option value="finding">បញ្ហាការស្វែងរកទំនិញ</option>
                                    <option value="safety">បញ្ហាសុវត្ថិភាព</option>
                                    <option value="other">បញ្ហាផ្សេងៗ</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="subject" class="form-label">ចំណងជើង <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="subject" v-model="formData.subject" required placeholder="បញ្ចូលចំណងជើងសង្ខេប">
                        </div>
                        
                        <div class="mb-3">
                            <label for="message" class="form-label">សារ <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="message" rows="5" v-model="formData.message" 
                                @input="autoResizeTextarea" required placeholder="ពិពណ៌នាអំពីបញ្ហា ឬសំណួររបស់អ្នកឱ្យបានលម្អិត..."></textarea>
                        </div>
                        
                        <div class="mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="urgent" v-model="formData.urgent">
                                <label class="form-check-label" for="urgent">
                                    បញ្ហានេះជាបញ្ហាបន្ទាន់
                                </label>
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <button type="submit" class="btn fs-6 btn-primary btn-lg">
                                <i class="bi bi-send me-2"></i> ផ្ញើសារ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive data
const showBackToTop = ref(false);
const cambodiaTime = ref('');

// Form data
const formData = ref({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    urgent: false
});

// Form submission
const submitForm = () => {
    // Simple validation
    if (!formData.value.name || !formData.value.email || !formData.value.category || 
        !formData.value.subject || !formData.value.message) {
        alert('សូមបំពេញព័ត៌មានទាំងអស់ដែលត្រូវការ។');
        return;
    }
    
    // Show success message
    alert('សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើរួចរាល់។ យើងនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗនេះ។');
    
    // Reset form
    formData.value = {
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        urgent: false
    };
};

// Auto-resize textarea
const autoResizeTextarea = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
};

// Scroll to top
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Handle scroll event
const handleScroll = () => {
    showBackToTop.value = window.pageYOffset > 300;
};

// Scroll to contact form
const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
    }
};

// Go to FAQ page
const goToFAQ = () => {
    // In a real application, you would navigate to the FAQ page
    // For now, show an alert
    // Or use router if available: router.push('/faq');
};

// Update Cambodia time
const updateCambodiaTime = () => {
    const options = { 
        timeZone: 'Asia/Phnom_Penh', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat('km-KH', options);
    cambodiaTime.value = formatter.format(new Date());
};

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Initialize time
    updateCambodiaTime();
    const timeInterval = setInterval(updateCambodiaTime, 1000);
    
    // Store interval for cleanup
    window.supportPageInterval = timeInterval;
    
    // Initialize Bootstrap components if needed
    if (typeof bootstrap !== 'undefined') {
        // Initialize any Bootstrap components here
    }
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    
    // Clear interval
    if (window.supportPageInterval) {
        clearInterval(window.supportPageInterval);
    }
});
</script>
<style scoped>
        body {
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.7;
        }
        
        .header-section {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 3rem 0;
            margin-bottom: 2rem;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
        }
        
        .support-card {
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            margin-bottom: 2rem;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .support-card:hover {
            transform: translateY(-5px);
        }
        
        .card-icon {
            width: 80px;
            height: 80px;
            background-color: rgba(26, 93, 26, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: var(--primary-color);
            font-size: 2.2rem;
        }
        
        .support-type-1 .card-icon {
            background-color: rgba(168, 85, 247, 0.1);
            color: var(--primary-color);
        }
        
        .support-type-2 .card-icon {
            background-color: rgba(236, 72, 153, 0.1);
            color: var(--danger-color);
        }
        
        .support-type-3 .card-icon {
            background-color: rgba(23, 162, 184, 0.1);
            color: var(--info-color);
        }
        
        .support-type-4 .card-icon {
            background-color: rgba(255, 193, 7, 0.1);
            color: var(--warning-color);
        }
        
        .support-form {
            background-color: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        
        .form-control:focus {
            border-color: var(--primary-color) !important;
            box-shadow: 0 0 0 1px var(--secondary-color) !important;
            outline: none;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
            padding: 0.75rem 2rem;
        }
        
        .btn-primary:hover {
            background-color: var(--secondary-color);
            border-color: var(--secondary-color);
        }
        
        .btn-success {
            background-color: #A855F7;
            border-color: var(--secondary-color);
        }
        
        .btn-success:hover {
            background-color: var(--tertiary-color);
            border-color: var(--tertiary-color);
        }
        
        .emergency-banner {
            background: linear-gradient(135deg, #ff6b6b, #ff4757);
            color: white;
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(255, 71, 87, 0.2);
        }
        
        @media (max-width: 768px) {
            .header-section h1 {
                font-size: 1.8rem;
            }
            
            .support-card {
                margin-bottom: 1.5rem;
            }
            
            .contact-method {
                margin-bottom: 1.5rem;
            }
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
            100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
        
        .status-offline {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-color: #dc3545;
            border-radius: 50%;
            margin-right: 8px;
        }
        /* Animation for status */
        .status-online {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-color: #4CAF50;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
    </style>