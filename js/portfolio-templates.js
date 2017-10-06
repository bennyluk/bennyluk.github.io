Templates = {};

Templates.home = [
  '<div class="page-content">',
    '<div class="content-section">',
      '<h1>Benny Luk</h1>',
      '<h3>"While (! Succeed = Try());"</h3>',
      '<a id="home-main-btn" href="#/projects" class="btn">Projects</a>',
    '</div>',
  '</div>'
];

Templates.about = [
  '<div class="page-content">',
    '<div class="content-section">',
      //'<i class="fa fa-fw fa-child fa-2x page-icon"></i>',
      '<div id="me"></div>',
      '<h2>About Me</h2>',
      '<div id="about-content" class="page-content">',
        '<h4 style="margin-bottom: 25px;">It all started with <a href="https://www.youtube.com/watch?v=tajDxBaPBBM" target="_blank">Windows 98.</a></h4>',
        '<p>I was six years in this world, when I first booted the computer. Innocent and curious to the moving pixels, I spent countless hours digging through the system files. Learning as I experiment, I would always see the unforgettable Blue Screen of Death.</p>',
        '<p>At 10 years old, my parents decided to jump in with the crave everyone was talking about, The Internet. With the unlimited vast knowledge of the Internet, I discovered Yahoo Geocities. Although rather basic and simple, I created a personal website which I write short stories and blogs that I would share with my friends. The experience was thrilling and exciting, as I watch my work come in motion and it was only a URL link away.</p>',
        '<p>At that moment I decided that I wanted to be a software developer.</p>',
        '<p>I simply love coding. <i class="fa fa-heart"></i></p>',
      '</div>',
    '</div>',
  '</div>'
];

Templates.projects = [
  '<% var numOfProjectsShow = args.all ? projectsList.length: 6;%>',

  '<div class="page-content">',
    '<div class="content-section">',
      '<i id="projects-icon" class="fa fa-fw fa-folder-open-o fa-2x page-icon"></i>',
      '<h2>Projects</h2>',
      '<p></p>',
      '<h4 class="text-divider" style="margin-bottom: 50px;">A Collection of Works</h4>',
      '<div class="grid-container">',
        '<% for(var i = 0; i < numOfProjectsShow; i++) { %>',
          '<% var project = projects[projectsList[i]]; %>',

          '<% if(project) { %>',
              '<div class="grid-item">',
                '<a href="#/project/<%=projectsList[i]%>">',
                  '<div class="grid-item-img-container">',
                    '<div class="grid-item-img" style="<% if(project.image) { %>background-image: url(<%=project.image%>)<% } %>"></div>',
                  '</div>',
                  '<div class="grid-item-caption"><span><%=project.name%></span></div>',
                '</a>',
              '</div>',
          '<% } %>',
        '<% } %>',
      '</div>',
      '<% if(!args.all) { %>',
        '<a id="projects-view-more" href="#/projects/all" class="btn">View More</a>',
      '<% } %>',
    '</div>',
  '</div>'
];

Templates.project = [
  '<div class="page-content">',
    '<div class="project-hero project-strip-bg project-row" style="background-image: url(<%=heroImg%>)">',
      '<h2 class="project-hero-name"><%=name%></h2>',
    '</div>',
    '<% for(var i = 0; i < content.length; i++) { %>',
      '<% var thisContent = content[i]; %>',
      '<% if(thisContent.id) { %>',
        '<a id="project-<%=thisContent.id%>"></a>',
      '<% } %>',
      '<% if(thisContent.type === "text") { %>',
        '<div class="content-section project-row">',
          '<% if(thisContent.title) { %>',
            '<h2><%=thisContent.title%></h2>',
          '<% } %>',
          '<% if(thisContent.description) { %>',
            '<p><%=thisContent.description%></p>',
          '<% } %>',
          '<% if(thisContent.menu) { %>',
            '<ul class="project-menu">',
              '<% for(var j in thisContent.menu) { %>',
                '<li>',
                  '<a href="#project-<%=j%>"><%=thisContent.menu[j]%></a>',
                '</li>',
                '<li>/</li>',
              '<% } %>',
            '</ul>',
          '<% } %>',
        '</div>',
      '<% } else if(thisContent.type === "video") { %>',
        '<div class="project-video-bg project-strip-bg project-row" style="<% if(thisContent.bg) { %>background-image: url(<%=thisContent.bg%>)<% } %>">',
          '<% if(thisContent.src) { %>',
            '<iframe class="project-video" width="80%" height="80%" src="<%=thisContent.src%>" frameborder="0" allowfullscreen></iframe>',
          '<% } %>',
        '</div>',
      '<% } else if(thisContent.type === "image") { %>',
        '<div class="project-strip-bg project-strip-image-bg project-row" style="<% if(thisContent.bg) { %>background-image: url(<%=thisContent.bg%>)<% } %>"></div>',
      '<% } else if(thisContent.type === "grid") { %>',
        '<div class="project-grid project-row">',
          '<% if(thisContent.align === "text") { %>',
            '<div class="project-grid-left-container project-grid-container">',
              '<div class="project-grid-text">',
                '<% if(thisContent.title) { %>',
                  '<h2><%=thisContent.title%></h2>',
                '<% } %>',
                '<% if(thisContent.description) { %>',
                  '<p><%=thisContent.description%></p>',
                '<% } %>',
              '</div>',
            '</div>',
            '<div class="project-grid-right-container project-grid-container project-grid-bg" style="<% if(thisContent.src) { %>background-image: url(<%=thisContent.src%>)<% } %>"></div>',
          '<% } else { %>',
            '<div class="project-grid-right-container project-grid-container project-grid-bg" style="<% if(thisContent.src) { %>background-image: url(<%=thisContent.src%>)<% } %>"></div>',
            '<div class="project-grid-left-container project-grid-container">',
              '<div class="project-grid-text">',
                '<% if(thisContent.title) { %>',
                  '<h2><%=thisContent.title%></h2>',
                '<% } %>',
                '<% if(thisContent.description) { %>',
                  '<p><%=thisContent.description%></p>',
                '<% } %>',
              '</div>',
            '</div>',
          '<% } %>',
        '</div>',
      '<% } %>',
    '<% } %>',
    '<div class="content-section-footer"></div>',
];

Templates.skills = [
  '<div class="page-content">',
    '<div id="skills-container" class="content-section">',
      '<i id="skills-icon" class="fa fa-fw fa-star fa-2x"></i>',
      '<h2>Skills</h2>',
      '<ul id="skills-container">',
        '<li class="skill selected" data-id="front-end">Front-End</li>',
        '<li class="skill" data-id="back-end">Back-End</li>',
        '<li class="skill" data-id="ui">UI / UX</li>',
        '<li class="skill" data-id="database">Database</li>',
      '</ul>',
      '<div id="skills-desc-container">',
        '<div id="skill-front-end" class="skills-desc active">',
          '<p>Fully Equipped with the fundamentals of HTML, CSS, and Javascript. I have built web applications from the scratch with or without frameworks.</p>',
          '<p>Have a clear understand on the MVC framework and the ability to use javascript template engine to ensure maximum performance on the application.</p>',
        '</div>',
        '<div id="skill-ui" class="skills-desc">',
          '<p>Although, I don’t label myself as a UI/UX designer, I am confident enough to say that I do think out of the box when it comes to design. Majority of my projects were mostly designed (or co-designed) by myself.</p>',
          '<p>When creating a project, I have experience in creating wireframes, understand the importance of position of icons, labels, pictures and usage of color, shapes, and even animation.</p>',
          '<p>With my set skills, I aim to deliver a project that is also good looking on the outside.</p>',
        '</div>',
        '<div id="skill-back-end" class="skills-desc">',
          '<p>Skilled with PHP, Java, and Coldfusion, I have worked on backend server code. With the power of framework, I have designed REST web services that will send or receive data from an external source.</p>',
          '<p>From Data Modelling and Database Access Objects, I can ensure that any information will be recorded into the database.</p>',
        '</div>',
        '<div id="skill-database" class="skills-desc">',
          '<p>Experienced with working with the fundamentals of database architecture and SQL. Worked with different RDBMS such as SQL Server, MySQL and Oracle Database.</p>',
        '</div>',
      '</div>',
    '</div>',
  '</div>'
];

Templates.contact = [
  '<div class="page-content">',
    '<div class="content-section">',
      '<i id="contact-icon" class="fa fa-fw fa-paper-plane fa-2x"></i>',
      '<h2>Ping Me</h2>',
      '<div id="contact-form-container">',
        '<form id="contact-form">',
          '<input type="text" name="name" title="Name" placeholder="Name" required>',
          '<input type="email" name="email" title="Email" placeholder="Email" required>',
          '<textarea name="message" title="Message" rows="4" placeholder="Message" required="" maxlength="300"></textarea>',
          '<input type="submit" value="PING 127.0.0.1">',
        '</form>',
      '</div>',
    '</div>',
  '</div>'
];

Templates.notFound = [
  '<div class="page-content">',
    '<div class="content-section">',
      '<i id="contact-icon" class="fa fa-fw fa-exclamation-triangle fa-2x"></i>',
      '<h2>Oooops, this page doesn\'t exist</h2>',
      '<div style="font-size: 18px; margin-top: 50px;">',
        'We can\'t seem to find the page you are looking for. Go back to <a href="https://bennyluk.github.io/">Home</a> page.',
      '</div>',
    '</div>',
  '</div>'
];

for(var id in Templates) {
  Templates[id] = _.template(Templates[id].join(""));
}