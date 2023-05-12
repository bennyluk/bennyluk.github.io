---
layout: project
title: Site Editor
about: Drag & Drop Site Builder
description: The main product of the business is a WYSIWYG site builder that allows users to add elements to their site page and adjust the element settings or styling without any prior coding knowledge.
roles: Senior Developer,Designer
date: 2016-2022
excerpt: Create a stunning website with ease using our intuitive website builder that guarantees top-notch performance and SEO optimization.
solutions:
    -   title: Ease of Use
        description: To address complaints from clients about our editor being too difficult to use, we added alignment guides and rulers, and <a href="/hotpot">updated the UI</a> to focus on core features. These changes significantly improved the user experience and served as inspiration for our new site editor, <a href="/bentobox">Bentobox</a>.
    -   title: Performance
        description: Due to the outdated tech stack used in the editor, performance issues started to arise as our user base grew, and our servers became overloaded. We tackled this problem by optimizing the SQL code, minimizing network requests, and only bootstrapping necessary data. While looking back, I realized that reducing the number of event triggers being fired would have been beneficial, but it would have taken too much time to test.
    -   title: Mobile Development
        description: To enable responsiveness on our website builder, we had to store two sets of data, one for mobile and one for desktop. While storing the data was easy, rendering it posed challenges as different browsers render fonts differently and devices come in different viewport sizes. We had to overcome this through testing and tweaking CSS and other workarounds.
features:
    -   title: Apps Integration
        description: To expand the functionality of our main product, the site editor, we created several side products such as the <a href="/tips-jar">Store Manager</a>, <a href="/caddy">File Manager</a>, Form Manager, and Members Manager. These products were designed to seamlessly integrate with the site editor, enhancing its capabilities and giving it a more complete feature set.
    -   title: Multiinguial Support
        description: To support our international clientele, we implemented multilingual support, which is not a common feature among our competitors. This required a site data migration, but we ensured the process was smooth and that clients could undo the changes if necessary.
theme:
    background: "#fff"
    color: "#000"
    primaryColor: "#077df8"
---

{%  
    include sections/video.html
        src="https://www.youtube.com/embed/hTe7V0xBC8c"
        caption="Introduction to the Editor"
%}

{%  
    include sections/solutions.html
%}

{%  
    include sections/images.html
        image1="https://lh3.googleusercontent.com/THspr4MpkyHDolbKDfjoW5l1MMrHf9kNoke2kgdwzqjNl0vM8rczZkGdjzQWy-iT1_UrxNErDwOxBdCUF89yAHimFutBkj92TsrR3XZfXLiHHEIq5qB74WS-N3fs3fTAXv-Z1FmO-rM"
        image1Alt="Screenshot of Bentobox site editor editing a section"
        image2="https://lh3.googleusercontent.com/kkIWxFq91LlE_j8jnIJFm9oYiMGthOJDYluHKg0DA8vxcdw3kw0gFBH_cWdPUjoN86ZT29zYAqi_dDVLYtwZ7uqijD673Y1LmvNiKTyb9jJ9uCr5ghJ3C3-CtRKXSiLcGB7jztNk2OI"
        image2Alt="Changing the section design in Bentobox site editor"
        image3="https://lh3.googleusercontent.com/qUVyvBL0NuukPLl9-3PBz_4cvCK8SVn2OhvZbrRzgAI7A8nBH_hgVpHwVQVLLCffmwWJ48Lx_GlbzKWV0AxheRzp0nv9mEv9cJahtIIOKKgz8ElMksjJaiipq2XoCdLrn9JkVFzufVU"
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
        image1="https://lh3.googleusercontent.com/HtKthhjI9j6s4KpgtKRG9U5vLL1x1TNFJmD57KAJdL-oO9fMx0rPkC5I-QheKY4__93cCIKSHCJL4v5DEpM06pUWEScMQLKTK-K5mlGia6VqeOzxWJMNuI_V9zAUVZGBIXXM4seO80A"
        image1Alt="Screenshot of Bentobox site editor editing a section"
        image2="https://lh3.googleusercontent.com/y6CCUaGoLUyKxuvgSA3dJXEPMVkvQQJm4VHux348jQ6aCOQoDjdOK_W5MWJ9Y4jPwKjxZmq1HXOJk2vZ8b4fUWBtbv8sUGFXXeXYR3lI2MZXdtW1mSi7KZn_V3gBqVtoFJcfmy5xDpk"
        image2Alt="Changing the section design in Bentobox site editor"
        image3="https://lh3.googleusercontent.com/6a9_8oT4XgBQRnVEW7BHeqHbZr68qEyaYk8UFrwNgMhdB4o3wDL5G46jMlZAug0q_rVEUFd4kN50dNgQIXG37t8M4dtUuiCCHg2PK8F8WnmtGnkMCEZKzBCSXoB6S_drAzJSdE3trYU"
        image3Alt="Previewing their website using our real-time mobile mode preview."
%}