// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e2.md / Enunciat disponible a u1e2.md

const CATEGORY_LIST = [
    {
        id: 1,
        name: 'design'
    }, {
        id: 2,
        name: 'development'
    }, {
        id: 3,
        name: 'consultancy'
    }
];

const PROJECT_LIST = [
    {
        id: 1,
        name: 'First Project',
        excerpt: 'Lorem <strong>ipsum</strong> dolor quan aemet...',
        categoryId: 2,
        progress: 90,
        archived: false,
        search: ['wordA', 'wordB', 'wordC'],
        tags: ['tag1', 'tag2']
    }, {
        id: 2,
        name: 'Second Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 2,
        progress: 50,
        archived: false,
        search: ['wordA', 'wordD'],
        tags: ['tag3']
    }, {
        id: 3,
        name: 'Third Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 1,
        progress: 20,
        archived: false,
        search: ['wordB', 'wordC'],
        tags: ['tag1', 'tag3']
    }, {
        id: 4,
        name: 'Fourth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB'],
        tags: ['tag2']
    }, {
        id: 5,
        name: 'Fifth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: false,
        search: ['wordA', 'wordC', 'wordD'],
        tags: ['tag1', 'tag2', 'tag3']
    }, {
        id: 6,
        name: 'Sixth Project',
        excerpt: 'Lorem ipsum <strong>dolor quan</strong> aemet...',
        categoryId: 2,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB', 'wordD'],
        tags: ['tag1']
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:
function renderProjects(){
    const list = document.querySelector(".js-project-list");
    const projectTemplate = document.getElementById("tpl-project").content;
    const tagTemplate = document.getElementById("tpl-tag").content;
    const fragment = document.createDocumentFragment()
    
    PROJECT_LIST.forEach((project) => {
        const clone = projectTemplate.cloneNode(true);
        const projectNode = clone.querySelector(".js-project");
        
        projectNode.dataset.id = project.id;
        projectNode.dataset.tags = project.tags.join(",");
        projectNode.dataset.search = project.search.join(",");
        projectNode.dataset.archived = project.archived;

        if (project.archived) {
            projectNode.classList.add("archived");
        }
        if (project.progress === 100) {
            projectNode.classList.add("completed");
        }

        projectNode.querySelector(".js-name").textContent = project.name;
        projectNode.querySelector(".js-progress").textContent = project.progress;
        projectNode.querySelector(".js-excerpt").innerHTML = project.excerpt;

        const category = CATEGORY_LIST.find(
            cat => cat.id === project.categoryId
        );
        projectNode.querySelector(".js-category").textContent = category.name;

        const tagsContainer = projectNode.querySelector(".js-tags");
        project.tags.forEach(tag => {
            const tagClone = tagTemplate.cloneNode(true);
            const tagLink = tagClone.querySelector(".js-tag-link");

            tagLink.dataset.tag = tag;
            tagLink.textContent = tag;

            tagsContainer.appendChild(tagClone);
        });

        fragment.appendChild(clone);
    });

    list.appendChild(fragment);
}

renderProjects();