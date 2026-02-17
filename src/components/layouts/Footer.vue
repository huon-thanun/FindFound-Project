<template>
    <footer class="footer">
        <div class="container-fluid px-5">
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
                        <li><router-link :to="{name: 'home'}">ទំព័រ​ដើម</router-link></li>
                        <li><router-link :to="{name: 'report.user'}">របាយការណ៍</router-link></li>
                        <li><router-link :to="{name: 'about'}">ប្រភេទរបាយការណ៍</router-link></li>
                        <li><router-link :to="{name: 'about'}">អំពី​យើង</router-link></li>
                        <li><router-link :to="{name: 'contact_us'}">ទំនាក់ទំនង</router-link></li>
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
                        <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
                        <li><a href="https://www.facebook.com/">Facebook</a></li>
                        <li><a href="https://web.telegram.org/">Telegram</a></li>
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
            <hr/>
            <!-- Copyright -->
            <div class="copyright">
                © Copyright 2024 FindFound<br/>
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
    color: black;
}

ul {
    list-style: none;
    padding: 0;
}

ul li {
    margin-bottom: 8px;
}

ul li a {
    color: black;
    text-decoration: none;
    font-size: 14px;
    position: relative;
    display: inline-block;
    transition: color 0.25s ease-out;
}

ul li a:hover {
    color: #7f23cf;
}

ul li a::before {
    content: "";
    position: absolute;
    left: 0;
    right: 100%;
    bottom: 0;
    height: 2px;
    background: #7f23cf;
    transition: right 0.25s ease-out;
}

ul li a:hover::before {
    right: 0;
}
hr{
    border: 1px solid white;
}
.copyright {
    font-size: 14px;
    color: #555;
    text-align: center;
    margin-top: 30px;
}

</style>