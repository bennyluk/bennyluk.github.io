---
layout: project
title: Caddy
about: File Management Software
description: Our file management app not only allows for efficient folder management, but also integrates all user media files into one centralized location, making it easier to reuse across multiple apps. We took it a step further by developing a custom media file delivery service that generates images based on their responsive breakpoints in real-time, ensuring optimal performance with caching.
roles: Project Lead,Developer,Designer
date: 2015
excerpt: Create a stunning website with ease using our intuitive website builder that guarantees top-notch performance and SEO optimization.
solutions:
    -   title: Media Transforming
        description: We brought our own server to generate optimized media by developing a URL structure that determines the best image based on the aspect ratio, as well as supporting new formats like WebP and AVIF for optimal performance. Our server, powered by NodeJS, securely delivers images, videos, and other document formats.
    -   title: NGINX Cache
        description: To manage the spike of traffic coming from our clients accessing the file server through the site editor and store manager, we implemented NGINX as a proxy server to cache the images. This helped to optimize the server response time, reduce server load and improve the overall performance of the file server.
theme:
    background: "#0e2382"
    color: "#FFF"
    primaryColor: "#fdeaad"
    link: "#fdeaad"
---

{%  
    include sections/video.html
        src="https://www.youtube.com/embed/EkRJ5zKHhX0"
        caption="Add Images To Your Online Site"
%}

{%  
    include sections/solutions.html
%}

{%  
    include sections/images.html
        image1="https://lh3.googleusercontent.com/pw/AJFCJaU1R3Or4OnzWFnNy309yRtHFA_p4ylD_TBhoyxVq08C4Xud0CNKQqzVLm_QuER7Ys8fK2h3lU-izfpF7v9-d7C8k8Y8_JSm-CZrrsBms2ykAhsR3Ocs"
        image1Alt="Screenshot of Bentobox site editor editing a section"
        image2="https://lh3.googleusercontent.com/PE7DaCAcv3rS8333rEcZSfAZoSMNx9C_p_GoxZJmLRFq-VlHSQug_WAVbgkmsKDZh0ENmrwaZAZXW0xp49v1_Vm2w3exJqZNu--Rh7E0oUWpl4m5tZvWSDAOU549e0A5mfKhX0__DkA"
        image2Alt="Changing the section design in Bentobox site editor"
        image3="https://lh3.googleusercontent.com/hvBJMSqwSOwukZ9tPnr7MdVNlgWXE-uYsmYEubEHM6wDkfowVOO07uclUyXUe3PA8wld2y2daObe-ua3yCdsM1bpaKhqzskrkOULrxM4rqQcMmUxBnSuoVG6WeD4Grn8NYSaSq9ZvoQ"
        image3Alt="Previewing their website using our real-time mobile mode preview."
%}

{%  
    include sections/team.html
        front="React,Backbone,SCSS,Webpack"
        back="Coldfusion,NodeJS,MSSQL Server"
        dev="Justin"
        design="MJ"
%}