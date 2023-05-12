(() => {
    const projectData = {{ site.data.projects | jsonify  }};

    const $projects = document.querySelectorAll(".image-wrapper");
    const $projectsReverse = [...$projects].reverse();

    const handleScroll = () => {
      if (window.innerWidth >= 960) {
        let t = 0;
        const n = window.scrollY,
            o = window.innerHeight / 2;
        for (let e = 0; e < $projectsReverse.length; e++) {
            if ($projectsReverse[e].offsetTop - n < o) {
                t = Math.abs(e - $projectsReverse.length) - 1;
                break;
            }
        }

        changeContent(t);
      }
    }

    const $projectImages = document.querySelector(".project-images");
    const handleMobileScroll = () => {
      if (window.innerWidth < 960) {
          const t = $projectImages.scrollLeft,
              n = window.innerWidth,
              o = Math.floor(t / n);

          changeContent(o)
      }
    }


    let currentIndex = 0;
    const $title = document.querySelector(".project-content h2")
    const $desc = document.querySelector(".project-content p");
    const $link = document.querySelector(".project-content a");

    const changeContent = (index) => {
      if(index !== currentIndex) {
        console.log("run it")
        currentIndex = index;

        $projects.forEach((el) => el.classList.remove("active"));
        $projects[index]?.classList.add("active");

        let projectInfo = projectData[index];
        $title.innerText = projectInfo.title;
        $desc.innerText = projectInfo.desc;
        $link?.setAttribute("href", `/${projectInfo.slug}`);

        document.body.style.backgroundColor = projectInfo?.theme?.background;
        document.body.style.color = document.body.style.fill = projectInfo?.theme?.color;
        document.querySelector("h2").style.color = projectInfo?.theme?.primaryColor;
      }
    }

    
    
    window.addEventListener("scroll", handleScroll, false);
    $projectImages?.addEventListener("scroll", handleMobileScroll)
})();