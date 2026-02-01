<template>
    <!-- Header Section -->
    <header class="header-section">
        <div class="container">
            <div class="text-center py-5">
                <h1 class="khmer-title mb-3">សំណួរដែលសួរញឹកញាប់</h1>
                <p class="lead khmer-content">ស្វែងរកចម្លើយសម្រាប់សំណួរទូទៅបំផុតអំពីសេវាកម្មរបស់យើង</p>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="container py-3">
        <!-- Search Box -->
        <div class="search-box">
            <div class="input-group">
                <input type="text" class="form-control" id="faqSearch" v-model="searchTerm"
                    placeholder="ស្វែងរកសំណួរឬចម្លើយ..." @keyup.enter="performSearch">
                <button class="btn btn-success" type="button" @click="performSearch">
                    <i class="bi bi-search"></i> ស្វែងរក
                </button>
            </div>
        </div>

        <!-- FAQ Stats -->
        <div class="row mb-4">
            <div class="col-md-3 col-6">
                <div class="faq-stats text-center">
                    <div class="stat-number">៥០+</div>
                    <div class="stat-label khmer-content">សំណួរសរុប</div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="faq-stats text-center">
                    <div class="stat-number">៦</div>
                    <div class="stat-label khmer-content">ផ្នែកផ្សេងៗ</div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="faq-stats text-center">
                    <div class="stat-number">៩៥%</div>
                    <div class="stat-label khmer-content">អ្នកប្រើប្រាស់ពេញចិត្ត</div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="faq-stats text-center">
                    <div class="stat-number">២៤/៧</div>
                    <div class="stat-label khmer-content">គាំទ្រឥតឈប់ឈរ</div>
                </div>
            </div>
        </div>

        <!-- FAQ Categories with Questions -->
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <!-- Category 1: General Questions -->
                <div class="faq-category">
                    <div class="category-header" data-category="general" @click="toggleCategory('general')">
                        <h5 class="khmer-title mb-0"><i class="bi bi-info-circle me-2"></i> សំណួរទូទៅ</h5>
                        <span class="category-toggle">
                            <i class="bi" :class="openCategories.includes('general') ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </span>
                    </div>
                    <div class="category-content" :class="{ 'show': openCategories.includes('general') }" id="general-content">
                        <div class="accordion" id="generalAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#general1">
                                        តើគេហទំព័រ FindFound នេះជាអ្វី?
                                    </button>
                                </h2>
                                <div id="general1" class="accordion-collapse collapse"
                                    data-bs-parent="#generalAccordion">
                                    <div class="accordion-body khmer-content">
                                        គេហទំព័រ FindFound គឺជាវេបសាយសម្រាប់ជំនួយក្នុងការភ្ជាប់ទំនិញបាត់ជាមួយម្ចាស់របស់វា។
                                        អ្នកអាចបង្កើតប្រកាសសម្រាប់ទំនិញដែលបាត់ ឬរកឃើញ
                                        ហើយយើងនឹងជួយភ្ជាប់ឱ្យបានឆាប់រហ័សបំផុត។
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#general2">
                                        តើប្រើប្រាស់គេហទំព័រនេះមានតម្លៃឬទេ?
                                    </button>
                                </h2>
                                <div id="general2" class="accordion-collapse collapse"
                                    data-bs-parent="#generalAccordion">
                                    <div class="accordion-body khmer-content">
                                        ទេ!
                                        ការប្រើប្រាស់គេហទំព័របាត់និងរកឃើញគឺឥតគិតថ្លៃទាំងស្រុងសម្រាប់អ្នកប្រើប្រាស់ទាំងអស់។
                                        យើងមិនគិតថ្លៃសម្រាប់ការបង្កើតប្រកាស ការស្វែងរក ឬការភ្ជាប់ទំនិញឡើយ។
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#general3">
                                        តើអាចប្រើប្រាស់គេហទំព័រនេះនៅលើទូរស័ព្ទបានឬទេ?
                                    </button>
                                </h2>
                                <div id="general3" class="accordion-collapse collapse"
                                    data-bs-parent="#generalAccordion">
                                    <div class="accordion-body khmer-content">
                                        បាទ! គេហទំព័ររបស់យើងត្រូវបានរចនាឱ្យមានលក្ខណៈឆបគ្នាទៅនឹងឧបករណ៍ទាំងអស់។
                                        អ្នកអាចប្រើប្រាស់បានលើកុំព្យូទ័រ ថេប្លេត និងទូរស័ព្ទដៃ។
                                        យើងក៏មានកម្មវិធីសម្រាប់ទូរស័ព្ទដៃផងដែរ។
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category 2: Registration and Account -->
                <div class="faq-category">
                    <div class="category-header" data-category="account" @click="toggleCategory('account')">
                        <h5 class="khmer-title mb-0"><i class="bi bi-person-circle me-2"></i> ការចុះឈ្មោះ និងគណនី</h5>
                        <span class="category-toggle">
                            <i class="bi" :class="openCategories.includes('account') ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </span>
                    </div>
                    <div class="category-content" :class="{ 'show': openCategories.includes('account') }" id="account-content">
                        <div class="accordion" id="accountAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#account1">
                                        តើត្រូវការចុះឈ្មោះដើម្បីប្រើប្រាស់សេវាកម្មឬទេ?
                                    </button>
                                </h2>
                                <div id="account1" class="accordion-collapse collapse"
                                    data-bs-parent="#accountAccordion">
                                    <div class="accordion-body khmer-content">
                                        អ្នកអាចរុករកមើលប្រកាសបាត់និងរកឃើញបានដោយមិនចាំបាច់ចុះឈ្មោះ។
                                        ប៉ុន្តែប្រសិនបើអ្នកចង់បង្កើតប្រកាស ឬទាក់ទងម្ចាស់ទំនិញ
                                        អ្នកត្រូវតែចុះឈ្មោះជាសមាជិកជាមុនសិន។
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#account2">
                                        តើធ្វើដូចម្តេចដើម្បីចុះឈ្មោះគណនី?
                                    </button>
                                </h2>
                                <div id="account2" class="accordion-collapse collapse"
                                    data-bs-parent="#accountAccordion">
                                    <div class="accordion-body khmer-content">
                                        ដើម្បីចុះឈ្មោះគណនី៖
                                        <ol>
                                            <li>ចុចលើប៊ូតុង "ចុះឈ្មោះ" នៅជ្រុងខាងលើខាងស្តាំ</li>
                                            <li>បំពេញព័ត៌មានដែលត្រូវការ (ឈ្មោះ, អ៊ីមែល, លេខទូរស័ព្ទ, ពាក្យសម្ងាត់)</li>
                                            <li>ចុចលើតំណភ្ជាប់បញ្ជាក់ក្នុងអ៊ីមែលរបស់អ្នក</li>
                                            <li>ចូលប្រើប្រាស់គណនីរបស់អ្នកបានភ្លាមៗ</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#account3">
                                        តើអាចកែប្រែព័ត៌មានគណនីបានដែរឬទេ?
                                        <span class="new-badge">ថ្មី</span>
                                    </button>
                                </h2>
                                <div id="account3" class="accordion-collapse collapse"
                                    data-bs-parent="#accountAccordion">
                                    <div class="accordion-body khmer-content">
                                        បាទ! អ្នកអាចកែប្រែព័ត៌មានគណនីរបស់អ្នកនៅពេលណាក៏បាន៖
                                        <ol>
                                            <li>ចូលទៅកាន់គណនីរបស់អ្នក</li>
                                            <li>ចុចលើ "កែប្រែព័ត៌មានផ្ទាល់ខ្លួន"</li>
                                            <li>កែប្រែព័ត៌មានដែលអ្នកចង់ផ្លាស់ប្តូរ</li>
                                            <li>ចុច "រក្សាទុក" ដើម្បីបញ្ជាក់ការផ្លាស់ប្តូរ</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category 3: Posting Items -->
                <div class="faq-category">
                    <div class="category-header" data-category="posting" @click="toggleCategory('posting')">
                        <h5 class="khmer-title mb-0"><i class="bi bi-plus-circle me-2"></i> ការបង្កើតប្រកាស</h5>
                        <span class="category-toggle">
                            <i class="bi" :class="openCategories.includes('posting') ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </span>
                    </div>
                    <div class="category-content" :class="{ 'show': openCategories.includes('posting') }" id="posting-content">
                        <div class="accordion" id="postingAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#posting1">
                                        តើធ្វើដូចម្តេចដើម្បីបង្កើតប្រកាសទំនិញបាត់?
                                    </button>
                                </h2>
                                <div id="posting1" class="accordion-collapse collapse"
                                    data-bs-parent="#postingAccordion">
                                    <div class="accordion-body khmer-content">
                                        ដើម្បីបង្កើតប្រកាសទំនិញបាត់៖
                                        <ol>
                                            <li>ចូលទៅកាន់គណនីរបស់អ្នក</li>
                                            <li>ចុចលើប៊ូតុង "បង្កើតប្រកាសថ្មី"</li>
                                            <li>ជ្រើសរើសប្រភេទ "ទំនិញបាត់"</li>
                                            <li>បំពេញព័ត៌មានអំពីទំនិញ (ឈ្មោះ, ការពណ៌នា, ទីកន្លែងបាត់, ថ្ងៃខែបាត់)</li>
                                            <li>ផ្ទុករូបថតទំនិញ (បើមាន)</li>
                                            <li>ចុច "បង្ហោះប្រកាស"</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#posting2">
                                        តើត្រូវការព័ត៌មានអ្វីខ្លះដើម្បីបង្កើតប្រកាស?
                                    </button>
                                </h2>
                                <div id="posting2" class="accordion-collapse collapse"
                                    data-bs-parent="#postingAccordion">
                                    <div class="accordion-body khmer-content">
                                        ព័ត៌មានចាំបាច់សម្រាប់បង្កើតប្រកាស៖
                                        <ul>
                                            <li>ប្រភេទទំនិញ (ទូរស័ព្ទដៃ, កាបូប, ឯកសារ, សត្វចិញ្ចឹម, ជាដើម)</li>
                                            <li>ឈ្មោះទំនិញ</li>
                                            <li>កាលបរិច្ឆេទនិងទីកន្លែងបាត់/រកឃើញ</li>
                                            <li>ការពណ៌នាអំពីទំនិញ</li>
                                            <li>រូបថត (បើមាន)</li>
                                            <li>ព័ត៌មានទំនាក់ទំនងរបស់អ្នក</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#posting3">
                                        តើប្រកាសនឹងត្រូវបានបង្ហោះរយៈពេលប៉ុន្មាន?
                                    </button>
                                </h2>
                                <div id="posting3" class="accordion-collapse collapse"
                                    data-bs-parent="#postingAccordion">
                                    <div class="accordion-body khmer-content">
                                        ប្រកាសទំនិញបាត់នឹងត្រូវបានបង្ហោះរយៈពេល ៣០ថ្ងៃ។ ប្រសិនបើទំនិញមិនទាន់ត្រូវបានរកឃើញ
                                        អ្នកអាចធ្វើបច្ចុប្បន្នភាពប្រកាសដើម្បីបន្តបង្ហោះរយៈពេល ៣០ថ្ងៃទៀត។
                                        ប្រកាសទំនិញរកឃើញត្រូវបានបង្ហោះរយៈពេល ៦០ថ្ងៃ។
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category 4: Finding and Contact -->
                <div class="faq-category">
                    <div class="category-header" data-category="finding" @click="toggleCategory('finding')">
                        <h5 class="khmer-title mb-0"><i class="bi bi-search me-2"></i> ការស្វែងរក និងទំនាក់ទំនង</h5>
                        <span class="category-toggle">
                            <i class="bi" :class="openCategories.includes('finding') ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </span>
                    </div>
                    <div class="category-content" :class="{ 'show': openCategories.includes('finding') }" id="finding-content">
                        <div class="accordion" id="findingAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#finding1">
                                        តើធ្វើដូចម្តេចដើម្បីស្វែងរកទំនិញបាត់?
                                    </button>
                                </h2>
                                <div id="finding1" class="accordion-collapse collapse"
                                    data-bs-parent="#findingAccordion">
                                    <div class="accordion-body khmer-content">
                                        ដើម្បីស្វែងរកទំនិញបាត់៖
                                        <ol>
                                            <li>ប្រើប្រអប់ស្វែងរកនៅផ្នែកខាងលើដើម្បីស្វែងរកតាមពាក្យគន្លឹះ</li>
                                            <li>ចុចលើប្រភេទទំនិញដើម្បីមើលប្រកាសទាំងអស់ក្នុងប្រភេទនោះ</li>
                                            <li>ប្រើមុខងារច្រោះតាមទីតាំង ថ្ងៃខែ ឬប្រភេទទំនិញ</li>
                                            <li>ចុចលើប្រកាសណាមួយដើម្បីមើលព័ត៌មានលម្អិត</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#finding2">
                                        តើធ្វើដូចម្តេចដើម្បីទាក់ទងម្ចាស់ទំនិញ?
                                    </button>
                                </h2>
                                <div id="finding2" class="accordion-collapse collapse"
                                    data-bs-parent="#findingAccordion">
                                    <div class="accordion-body khmer-content">
                                        ដើម្បីទាក់ទងម្ចាស់ទំនិញ៖
                                        <ol>
                                            <li>ចូលទៅកាន់ទំព័រប្រកាសដែលអ្នកចាប់អារម្មណ៍</li>
                                            <li>ចុចលើប៊ូតុង "ទាក់ទងម្ចាស់ទំនិញ"</li>
                                            <li>ផ្ញើសារតាមរយៈប្រព័ន្ធសារផ្ទៃក្នុងរបស់យើង</li>
                                            <li>រង់ចាំការឆ្លើយតបពីម្ចាស់ទំនិញ</li>
                                        </ol>
                                        <p class="mt-2"><strong>ចំណាំ៖</strong>
                                            យើងមិនបង្ហាញលេខទូរស័ព្ទឬអ៊ីមែលដាច់ដោយឡែកទេ
                                            ដើម្បីការពារភាពឯកជនរបស់អ្នកប្រើប្រាស់។</p>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#finding3">
                                        តើធ្វើដូចម្តេចប្រសិនបើខ្ញុំរកឃើញទំនិញរបស់ខ្ញុំ?
                                        <span class="new-badge">ថ្មី</span>
                                    </button>
                                </h2>
                                <div id="finding3" class="accordion-collapse collapse"
                                    data-bs-parent="#findingAccordion">
                                    <div class="accordion-body khmer-content">
                                        ប្រសិនបើអ្នករកឃើញទំនិញដែលបាត់៖
                                        <ol>
                                            <li>ចូលទៅកាន់ប្រកាសរបស់អ្នក</li>
                                            <li>ចុចលើប៊ូតុង "ទំនិញត្រូវបានរកឃើញ"</li>
                                            <li>បញ្ជាក់ពីស្ថានភាព (ទំនិញត្រូវបានរកឃើញ ឬឈប់ស្វែងរក)</li>
                                            <li>ប្រកាសនឹងត្រូវបានសម្គាល់ថាជា "ត្រូវបានដោះស្រាយ"</li>
                                            <li>អ្នកប្រើប្រាស់ដទៃនឹងមិនអាចមើលប្រកាសនេះបានទៀតទេ</li>
                                        </ol>
                                        <p class="mt-2"><strong>ព័ត៌មានបន្ថែម៖</strong>
                                            សូមផ្តល់មតិយោបល់អំពីបទពិសោធន៍របស់អ្នក ដើម្បីជួយអ្នកប្រើប្រាស់ដទៃទៀត។</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category 5: Safety and Security -->
                <div class="faq-category">
                    <div class="category-header" data-category="safety" @click="toggleCategory('safety')">
                        <h5 class="khmer-title mb-0"><i class="bi bi-shield-check me-2"></i> សុវត្ថិភាព និងការពារ</h5>
                        <span class="category-toggle">
                            <i class="bi" :class="openCategories.includes('safety') ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </span>
                    </div>
                    <div class="category-content" :class="{ 'show': openCategories.includes('safety') }" id="safety-content">
                        <div class="accordion" id="safetyAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#safety1">
                                        តើព័ត៌មានរបស់ខ្ញុំមានសុវត្ថិភាពទេ?
                                    </button>
                                </h2>
                                <div id="safety1" class="accordion-collapse collapse" data-bs-parent="#safetyAccordion">
                                    <div class="accordion-body khmer-content">
                                        បាទ! យើងយកចិត្តទុកដាក់ខ្លាំងណាស់លើសុវត្ថិភាពព័ត៌មានរបស់អ្នក។
                                        <ul>
                                            <li>ព័ត៌មានផ្ទាល់ខ្លួនត្រូវបានរក្សាទុកក្នុងប្រព័ន្ធដែលមានការការពារខ្ពស់</li>
                                            <li>យើងមិនចែករំលែកព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នកទៅភាគីទីបីដោយគ្មានការអនុញ្ញាតឡើយ
                                            </li>
                                            <li>ការទំនាក់ទំនងរវាងអ្នកប្រើប្រាស់ត្រូវបានធ្វើតាមរយៈប្រព័ន្ធសារផ្ទៃក្នុងដែលមានសុវត្ថិភាព
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#safety2">
                                        តើអ្វីខ្លះដែលខ្ញុំមិនគួរធ្វើនៅពេលទាក់ទងម្ចាស់ទំនិញ?
                                    </button>
                                </h2>
                                <div id="safety2" class="accordion-collapse collapse" data-bs-parent="#safetyAccordion">
                                    <div class="accordion-body khmer-content">
                                        ដើម្បីសុវត្ថិភាពរបស់អ្នក សូមជៀសវាង៖
                                        <ul>
                                            <li>ផ្តល់ព័ត៌មានធនាគារ ឬព័ត៌មានហិរញ្ញវត្ថុផ្ទាល់ខ្លួន</li>
                                            <li>ជួបជាមួយម្ចាស់ទំនិញតែម្នាក់ឯងនៅកន្លែងស្ងាត់</li>
                                            <li>ផ្តល់លុយមុននឹងទទួលបានទំនិញ</li>
                                            <li>ប្រគល់ទំនិញដោយមិនបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណម្ចាស់ទំនិញ</li>
                                            <li>ចុចតំណភ្ជាប់ដែលមិនធ្លាប់ស្គាល់ពីអ្នកប្រើប្រាស់ដទៃ</li>
                                        </ul>
                                        <p class="mt-2"><strong>អនុសាសន៍៖</strong> ជួបគ្នានៅកន្លែងសាធារណៈ
                                            នាំមិត្តឬសាច់ញាតិជាមួយ និងផ្ទៀងផ្ទាត់អត្តសញ្ញាណមុនពេលប្រគល់ទំនិញ។</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category 6: Technical Support -->
                <div class="faq-category">
                    <div class="category-header" data-category="technical" @click="toggleCategory('technical')">
                        <h5 class="khmer-title mb-0"><i class="bi bi-wrench me-2"></i> ជំនួយបច្ចេកទេស</h5>
                        <span class="category-toggle">
                            <i class="bi" :class="openCategories.includes('technical') ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </span>
                    </div>
                    <div class="category-content" :class="{ 'show': openCategories.includes('technical') }" id="technical-content">
                        <div class="accordion" id="technicalAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#technical1">
                                        តើធ្វើដូចម្តេចដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ?
                                    </button>
                                </h2>
                                <div id="technical1" class="accordion-collapse collapse"
                                    data-bs-parent="#technicalAccordion">
                                    <div class="accordion-body khmer-content">
                                        ដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ៖
                                        <ol>
                                            <li>ចុចលើ "ភ្លេចពាក្យសម្ងាត់" នៅទំព័រចូលប្រើប្រាស់</li>
                                            <li>បញ្ចូលអាសយដ្ឋានអ៊ីមែលដែលអ្នកបានចុះឈ្មោះ</li>
                                            <li>ពិនិត្យអ៊ីមែលរបស់អ្នកសម្រាប់តំណភ្ជាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញ</li>
                                            <li>ចុចលើតំណភ្ជាប់ និងបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នក</li>
                                            <li>ចុច "កំណត់ពាក្យសម្ងាត់ឡើងវិញ" ដើម្បីបញ្ចប់</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed khmer-content" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#technical2">
                                        តើធ្វើដូចម្តេចប្រសិនបើខ្ញុំមិនទទួលបានអ៊ីមែលបញ្ជាក់?
                                    </button>
                                </h2>
                                <div id="technical2" class="accordion-collapse collapse"
                                    data-bs-parent="#technicalAccordion">
                                    <div class="accordion-body khmer-content">
                                        ប្រសិនបើអ្នកមិនទទួលបានអ៊ីមែលបញ្ជាក់៖
                                        <ol>
                                            <li>ពិនិត្យមើលថតសារឥតបានការ (junk/spam folder) នៅក្នុងអ៊ីមែលរបស់អ្នក</li>
                                            <li>ពិនិត្យថាអ្នកបានបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ</li>
                                            <li>រង់ចាំពី ៥-១០ នាទី ព្រោះអ៊ីមែលអាចមកយឺត</li>
                                            <li>សាកល្បងចុច "ផ្ញើអ៊ីមែលបញ្ជាក់ម្តងទៀត"</li>
                                            <li>ប្រសិនបើនៅតែមិនទទួលបាន សូមទាក់ទងក្រុមជំនួយរបស់យើង</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>

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

.faq-category {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.category-header {
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.2s;
}

.category-header:hover {
    background-color: var(--secondary-color);
}

.category-content {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
}

.category-content.show {
    max-height: 2000px;
    transition: max-height 0.8s ease-in;
}

.accordion-item {
    border: none;
    border-bottom: 1px solid #eee;
}

.accordion-button {
    background-color: white;
    color: var(--primary-color);
    font-weight: bold;
    padding: 1.25rem 1.5rem;
}

.accordion-button:not(.collapsed) {
    background-color: var(--tertiary-color);
    color: var(--surface-color);
    box-shadow: none;

}

.accordion-button:focus {
    box-shadow: 0 0 0 0.25rem var(--secondary-color);
}

.accordion-button::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%231a5d1a'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-body {
    padding: 1.5rem;
    background-color: #f9f9f9;
    font-size: 1.05rem;
}

.search-box {
    max-width: 500px;
    margin: 0 auto 2rem;
}

.search-box input {
    border-radius: 50px;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--secondary-color);
}

.search-box button {
    border-radius: 50px;
    padding: 0.75rem 2rem;
    background-color: var(--secondary-color);
    border: none;
}

.form-control:focus {
    box-shadow: none;
}

.contact-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    margin-top: 2rem;
}

.contact-icon {
    width: 70px;
    height: 70px;
    background-color: rgba(26, 93, 26, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: var(--primary-color);
    font-size: 1.8rem;
}

.faq-stats {
    background-color: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary-color);
}

.stat-label {
    color: #666;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .header-section h1 {
        font-size: 1.8rem;
    }

    .accordion-button {
        padding: 1rem 1.25rem;
        font-size: 1rem;
    }

    .accordion-body {
        padding: 1.25rem;
    }
}

/* Animation for new questions */
.highlight-new {
    animation: highlight 2s ease;
}

@keyframes highlight {
    0% {
        background-color: rgba(255, 193, 7, 0.3);
    }

    100% {
        background-color: transparent;
    }
}

/* Badge for new questions */
.new-badge {
    background-color: #ff4757;
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    margin-left: 0.5rem;
    vertical-align: middle;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const searchTerm = ref('');
const openCategories = ref(['general']); // Open first category by default
const showBackToTop = ref(false);

// Toggle category sections
const toggleCategory = (category) => {
    const index = openCategories.value.indexOf(category);
    if (index > -1) {
        openCategories.value.splice(index, 1);
    } else {
        openCategories.value.push(category);
    }
};

// Search functionality
const performSearch = () => {
    if (!searchTerm.value.trim()) return;

    const khmerContent = document.querySelectorAll('.khmer-content');
    let foundResults = false;

    // Reset all highlights
    khmerContent.forEach(element => {
        element.classList.remove('highlight-new');
    });

    // Close all accordions first
    document.querySelectorAll('.accordion-collapse').forEach(collapse => {
        collapse.classList.remove('show');
    });

    // Open parent categories and search
    const searchLower = searchTerm.value.toLowerCase();
    document.querySelectorAll('.accordion-button, .accordion-body').forEach(element => {
        if (element.textContent.toLowerCase().includes(searchLower)) {
            // Highlight matching elements
            element.classList.add('highlight-new');

            // Open parent accordion
            if (element.classList.contains('accordion-button')) {
                const target = element.getAttribute('data-bs-target');
                if (target) {
                    const collapseElement = document.querySelector(target);
                    if (collapseElement) {
                        collapseElement.classList.add('show');
                    }
                }
            } else if (element.classList.contains('accordion-body')) {
                // Find parent accordion and open it
                const parentAccordion = element.closest('.accordion-item');
                if (parentAccordion) {
                    const button = parentAccordion.querySelector('.accordion-button');
                    if (button) {
                        const target = button.getAttribute('data-bs-target');
                        if (target) {
                            const collapseElement = document.querySelector(target);
                            if (collapseElement) {
                                collapseElement.classList.add('show');
                            }
                        }
                    }
                }
            }

            // Open parent category
            const categoryContent = element.closest('.category-content');
            if (categoryContent) {
                const categoryId = categoryContent.id.replace('-content', '');
                if (!openCategories.value.includes(categoryId)) {
                    openCategories.value.push(categoryId);
                }
            }

            foundResults = true;
        }
    });
};

// Back to top functionality
const handleScroll = () => {
    showBackToTop.value = window.pageYOffset > 300;
};

const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Initialize on component mount
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Bootstrap accordions if needed
    if (typeof bootstrap !== 'undefined') {
        const accordionElements = document.querySelectorAll('.accordion-collapse');
        accordionElements.forEach(element => {
            new bootstrap.Collapse(element, { toggle: false });
        });
    }
});

// Cleanup on component unmount
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>