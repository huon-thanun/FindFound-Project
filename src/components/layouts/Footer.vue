<template>
    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <div class="footer-logo">
                    <img src="../../assets/images/logo/logo.png" class="object-fit-cover" height="79px" width="170px" alt="">
                </div>
            </div>

            <div class="footer-section">
                <h3>Site</h3>
                <ul>
                    <li><router-link to="">Lost</router-link></li>
                    <li><router-link to="">Report Lost</router-link></li>
                    <li><router-link to="">Found</router-link></li>
                    <li><router-link to="">Report Found</router-link></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Help</h3>
                <ul>
                    <li><router-link to="">Customer Support</router-link></li>
                    <li><router-link to="">Terms & Conditions</router-link></li>
                    <li><router-link to="">Privacy Policy</router-link></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Links</h3>
                <ul>
                    <li><router-link to="">Linkdin</router-link></li>
                    <li><router-link to="">Facebook</router-link></li>
                    <li><router-link to="">You Tube</router-link></li>
                    <li><router-link to="">About Us</router-link></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Contact</h3>
                <div class="contact-info">
                    <p><strong>Tel:</strong> +855716320690</p>
                    <p><strong>Email:</strong> findfound@gamil.com</p>
                </div>
                <div class="social-icons">
                    <a href="#" title="Twitter">🐦</a>
                    <a href="#" title="Facebook">f</a>
                    <a href="#" title="Instagram">📷</a>
                    <a href="#" title="GitHub">⚙</a>
                </div>
            </div>
        </div>

        <div class="copyright">
            © Copyright 2024 FindFound<br>
            All Right Reserved
        </div>
    </footer>
</template>

    <style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        footer {
            background: var(--tertiary-color);
            padding: 30px 50px;
        }

        .footer-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            max-width: 1440px;
            margin: 0 auto;
            gap: 40px;
        }

        .footer-section {
            flex: 1;
        }
        h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            color: white;
        }

        ul {
            list-style: none;
        }

        ul li {
            margin-bottom: 8px;
        }

        ul li a {
            color: var(--light);
            text-decoration: none;
            font-size: 14px;
        }

        ul li a:hover {
            text-decoration: underline;
        }

        .copyright {
            text-align: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #ffffff;
            font-size: 13px;
            color: var(--light);
        }

        .contact-info {
            font-size: 14px;
            color: var(--light);
            line-height: 1.8;
        }

        .contact-info p {
            margin-bottom: 5px;
        }

        .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 15px;
        }

        .social-icons a {
            width: 35px;
            height: 35px;
            background: var(--light);
            border: 1px solid #ccc;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            text-decoration: none;
            font-size: 16px;
            transition: all 0.3s;
        }

        .social-icons a:hover {
            background: var(--primary-color);
            color: #fff;
        }
    </style>