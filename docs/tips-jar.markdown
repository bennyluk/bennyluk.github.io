---
layout: project
title: Tips Jar
about: eCommerce CMS Software
description: "Our eCommerce platform enables clients using our website builder to incorporate a store on their website. This includes features such as product management, order tracking, coupons, and payment integration."
roles: Lead Developer, Designer
date: 2016
project: https://www.website.com/online-store-builder/
excerpt: Create a stunning website with ease using our intuitive website builder that guarantees top-notch performance and SEO optimization.
solutions:
    -   title: Lead Developer
        description: As the lead developer, Store Manager was my first project. It was a challenging yet rewarding experience that taught me valuable lessons in project direction and architecture. Despite the complexity, the app became widely popular and continues to be used today.
    -   title: Payment OAuth 
        description: I learned about the OAuth process for major payment providers like PayPal, Stripe, and Square, and updated our tech stack to migrate from NVP to Rest API. Additionally, I created a secure vault database to store payment tokens, protecting them from external requests.
    -   title: Data Driven Analytics
        description: During the app development cycle, I incorporated data-driven analytics, including A/B testing and tracking page views and events to measure the usage of different features. I believed that incorporating data-driven ideas in our meetings would be beneficial. Additionally, I used this data to further develop our in-house design language, <a href="/hotpot">HotPot</a>.
    -   title: Big Data Performance
        description: To accommodate our clients who often have large product catalogs and want to display them on the homepage, I focused on optimizing the database and SQL scripts for performance. This was crucial to ensure the site loads quickly and does not overload the server. Additionally, we implemented a reverse proxy to cache site content and requests, further improving site speed.
features:
    -   title: Abandon Checkout
        description: One of the most popular features in our store manager was the abandoned checkout functionality. It allows store owners to send a follow-up email with a coupon code to clients who left the checkout process before completing their purchase. While the logic behind this feature was simple, I spent time preparing the database to ensure a smooth development process.
    -   title: Coupons
        description: Implementing a product discount feature that includes taxes and shipping, along with various types of discounts, may sound easy, but it was actually quite complex. Despite the challenge, I was able to develop a solution that covered most use cases while keeping the coupon creation interface user-friendly for the site owner. This feature became quite popular among our clients.
theme:
    background: "rgb(21, 49, 54)"
    color: "#FFF"
    primaryColor: "#b9966e"
    link: "#b9966e"
---

{%  
    include sections/video.html
        src="https://www.youtube.com/embed/ibyvry2bVZc"
        caption="Add Products To Your Online Store On Your Smartphone"
%}

{%  
    include sections/solutions.html
%}

{%  
    include sections/images.html
        image1="https://lh3.googleusercontent.com/UCrtHxPe90fSCIY4iIacn0qTGuKz5aPaOhP4nSMeqgajz2Lv_31rwD2SE2Voi3g3HMQ3wIF16jBtAgzBnMZ0ryDuIABhh1F1h2h13AH7aQdW_h8zgsm9jDEWeOEtTIEjdt2Nb6pb1po"
        image1Alt="Screenshot of Bentobox site editor editing a section"
        image2="https://lh3.googleusercontent.com/3UdQ7oBHqRe-Dt6HAMuSI4IeqNPHk5qn5fzSKPIjXgUMnykf6Hj3g4ZqSBTx2FqumdiXgGc3TebFa4S6iGSHjyl-TkE3BTCa1hFkAPJew4xExUZ52Pv_bze8EYMh93Gb8z_MpLz9cOo"
        image2Alt="Changing the section design in Bentobox site editor"
        image3="https://lh3.googleusercontent.com/J5KfxZhYkJpqvWZ7dl2_eh6BDBRlvcYKDXXYeo9t4Uviij1fWwwv9wm3fvhd0Ayfo4peOF9SjNu0Nf-QyRVdqIHdiCzTcOdL14S75D6IpGz3v03Q0NHXhhl3ouBhxQ_pED32PmB5a-s"
        image3Alt="Previewing their website using our real-time mobile mode preview."
%}

{%  
    include sections/team.html
        front="Backbone,SCSS,Webpack"
        back="Coldfusion,NodeJS,MSSQL Server"
        dev="Henry"
        design="MJ"
%}

{%  
    include sections/features.html
%}

{%  
    include sections/images.html
        image2="https://lh3.googleusercontent.com/cCP69RdhujuEsOpXPCzbut2hlGmDJ_QBPzUhjEIZ5QOj-pNcldoBCwDXCKc2Eh4kZXd0nu62j8XTKV9NBo_l_-8ug7v5BfbpY5HuPlBp4IE0-spAFoXqgmTCcDbnxVgrxOx20udRY4E"
        image2Alt="Manging coupons in store manager"
        image3="https://lh3.googleusercontent.com/NKTMkop28UPSgT0fYZJRJ9P9SeRVXac5T5mF2BxK3Jh1h8QXAsDpgeziWVXaIJgvPDA47Xw0mjfGImeYMvl881YXrflt7jA73ZeWDAWTFrbFuRZzOzFBLwRL1CfZNs2EOnZ81KOs-kc"
        image3Alt="Manging payment providers in store manager"
%}