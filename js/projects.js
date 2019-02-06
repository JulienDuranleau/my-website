;(function() {

    var PROJECT_HASH = 'projects'
    var HIDE_CLASS = 'hide'
    var SHOW_CLASS = 'show'
    var NO_SCROLL_CLASS = 'noscroll'

    var projectBt = document.querySelector('#open-projects-bt')
    var pageIndex = document.querySelector('#page-index')
    var pageProjects = document.querySelector('#page-projects')

    projectBt.addEventListener('click', showProjects.bind(this), false)

    loadProjects()

    if (window.location.hash === '#' + PROJECT_HASH) {
        showProjects()
    }

    function showProjects(e) {
        if (e) e.preventDefault()
        
        window.location.hash = PROJECT_HASH

        pageIndex.classList.add(HIDE_CLASS)
        pageProjects.classList.add(SHOW_CLASS)
        document.body.classList.remove(NO_SCROLL_CLASS)
    }

    function hideProjects(e) {
        if (e) e.preventDefault()

        window.location.hash = ''

        pageIndex.classList.remove(HIDE_CLASS)
        pageProjects.classList.remove(SHOW_CLASS)
        document.body.classList.add(NO_SCROLL_CLASS)
    }

    function loadProjects() {
        var xmlhttp = new XMLHttpRequest()

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    pageProjects.innerHTML = xmlhttp.responseText

                    initProjects()
                }
            }
        }

        xmlhttp.open("GET", "projects.html", true)
        xmlhttp.send()
    }

    function initProjects() {
        var projectCloseBt = document.querySelector('#close-projects-bt')
        projectCloseBt.addEventListener('click', hideProjects.bind(this), false)
    }
})();
