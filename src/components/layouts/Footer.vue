<template>
    <footer class="footer">
        <div class="container p-0 m-0 m-auto">
            <div class="row gy-4 text-center text-md-start">

                <!-- Logo -->
                <div class="col-12 col-md-4 col-lg-3 p-0">
                    <router-link to="/">
                        <img src="../../assets/images/logo/logo.png" class="object-fit-cover" height="79px"
                            width="170px" alt="">
                    </router-link>
                </div>

                <!-- Site -->
                <div class="col-6 col-md-4 col-lg-2 p-0">
                    <h3>គេហទំព័រ</h3>
                    <ul>
                        <li><router-link to="">Lost</router-link></li>
                        <li><router-link to="">Report Lost</router-link></li>
                        <li><router-link to="">Found</router-link></li>
                        <li><router-link to="">Report Found</router-link></li>
                    </ul>
                </div>

                <!-- Help -->
                <div class="col-6 col-md-4 col-lg-2 p-0">
                    <h3>ផ្តល់ជំនួយ</h3>
                    <ul>
                        <li><router-link to="/support">ជំនួយ និងការគាំទ្រ</router-link></li>
                        <li><router-link to="/policy">គោលការណ៍ឯកជនភាព</router-link></li>
                        <li><router-link to="/faq">សំណួរដែលសួរញឹកញាប់</router-link></li>
                    </ul>
                </div>

                <!-- Links -->
                <div class="col-6 col-md-4 col-lg-2 p-0">
                    <h3>តំណភ្ជាប់</h3>
                    <ul>
                        <li><router-link to="">LinkedIn</router-link></li>
                        <li><router-link to="">Facebook</router-link></li>
                        <li><router-link to="">Tik Tok</router-link></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div class="col-6 col-md-4 col-lg-3 p-0">
                    <h3>Contact</h3>
                    <div class="contact-info">
                        <p><strong>Tel:</strong> +855 12 345 678</p>
                        <p><strong>Email:</strong> findfound@gmail.com</p>
                    </div>
                </div>

            </div>

            <!-- Copyright -->
            <div class="copyright mt-4">
                © Copyright 2024 FindFound<br />
                All Right Reserved
            </div>
        </div>
    </footer>
</template>


<style scoped>
footer {
    background: var(--tertiary-color);
    padding: 40px 0;
}

h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    color: white;
}

ul {
    list-style: none;
    padding: 0;
}

ul li {
    margin-bottom: 8px;
}

/* Hover underline effect (unchanged) */
ul li a {
    color: var(--light);
    text-decoration: none;
    font-size: 14px;
    position: relative;
    display: inline-block;
}

ul li a::before {
    content: "";
    position: absolute;
    left: 0;
    right: 100%;
    bottom: 0;
    height: 2px;
    background: var(--light);
    transition: right 0.25s ease-out;
}

ul li a:hover::before {
    right: 0;
}

.contact-info {
    font-size: 14px;
    color: var(--light);
    line-height: 1.8;
}

.copyright {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid #ffffff;
    font-size: 13px;
    color: var(--light);
}
</style>