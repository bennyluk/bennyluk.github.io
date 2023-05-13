---
layout: project
title: Hot Pot
about: Design Language
description: Lead the developement of our in-house design language, Hot Pot, to solve a problem that emerged in the later stages of development. The codebase lacked a clear set of guidelines for presenting the user interface, resulting in inconsistencies and code duplication. Hot Pot resolved this issue and ensured smoother future development.
roles: Project Lead,Developer
date: 2020-2022
project: https://www.website.com/online-store-builder/
excerpt: An in-house design language to ensure consistency, avoid code duplication, and improve UI development for a smoother workflow.
solutions:
    -   title: Pitching Idea
        description: Meeting with the ROI-focused CEO to push for a design language was challenging. I proposed bundling it with a new product, <a href="/caddy">File Manager</a>, and presented analytics data to showcase increased usage and engagement. This evidence-based approach effectively demonstrated the value of adopting a design language within the organization.
    -   title: New Technology
        description: I migrated our outdated Backbone tech stack to React to align with the new design language. I developed the React components myself using Storybook, with the aim of making it easier for the other developers to join later on.
    -   title: Data Drive Analytics
        description: Using React allowed for easier extension of our feedback elements, including form inputs, buttons, and pages. I implemented analytics for each component to measure clicks and identify any UX patterns or bugs.
    -   title: Update Existing App
        description: To make the implementation of React smoother, I also developed a SCSS file that was webpacked, allowing for easy implementation into our other apps using traditional class names. This was particularly useful for updating our <a href="/site-editor">site editor</a> and <a href="/tips-jar">store manager</a>, which were too large of projects to transition entirely to React.
features:
    -   title: Mobile Ready
        description: I made sure all of our components were touch-friendly to enhance the user experience on mobile devices. This involved making changes such as eliminating tooltips, using modern icons instead of traditional text labels, and optimizing button size for better clicking. Additionally, I focused on speed by removing unnecessary animations and transitions.
    -   title: Breathing Room
        description: To keep our data and form inputs organized, I avoided cluttering the fields with dividers and borders. Instead, I utilized "spaces" to visually separate different sections, as demonstrated in the clean and simple design of the <a href="/tips-jar">Store Manager</a>.
    -   title: Labels vs Icons
        description: Our first product, the <a href="/site-editor">site editor</a>, used icons instead of labels to save space. However, customer feedback and analytics revealed that users were often confused and did not click on certain icons. To address this, we switched to using labels, which greatly improved user understanding and engagement.
theme:
    background: "#2e2e2e"
    color: "#FFF"
    primaryColor: "#4286F5"
    link: "#4286F5"
---

{%  
    include sections/images.html
        image1="https://lh3.googleusercontent.com/uS559ttnW0uNea_HWJnivA8B-XOCGLc7iemQbD6LEQ_9pFpZD02kbJZF-cNTZ2z3I6iZHyeFDEwzGvORTHPIeReUtMRg_DHpWK4mdZw_fPwe1i2Xr3BrPWoB3Xzln4GQT3aVcCO8LAg"
        image1Alt="Screenshot of Bentobox site editor editing a section"
%}

{%  
    include sections/solutions.html
%}

{%  
    include sections/team.html
        tech="Storybook,Adobe XD"
        front="React,SCSS"
        dev="Benny"
        design="MJ"
%}

<style>
    .colors > div {
        height: 70px;
        margin-bottom: 25px;
        display: flex;
        width: 400px;
        align-items: center;
        padding-left: 20px;
        border-radius: 8px;
        color: #FFF;
        font-weight: 600;
    }
</style>
<section>
    <div class="container flex">
        <div style="min-width: 380px;">
            <div class="h4">Typography</div>
            <div style="color: #FFF;font-size:2.5rem;" class="font-bold">Nunito Sans<br>Aa123</div>
        </div>
        <div>
                <div class="h4">Colors</div>
                <div class="colors">
                    <div style="background: rgb(66, 134, 245);">#4286F5</div>
                    <div style="background: green;">#32323</div>
                    <div style="background: yellow;color:#000;">#423432</div>
                    <div style="background: red;">#89781</div>
                </div>
        </div>
    </div>
   
</section>


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