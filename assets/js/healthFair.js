for (let data of imageWrapperData) {
    let activePage = data.activePage;
    const container = document.querySelector(`#${data.id}`);
    let paginationContainer = document.createElement("div");
    paginationContainer.setAttribute("class", "pagination-container");
    paginationContainer.innerHTML = '<div class="pagination-btn-wrapper" id="pagination-' + data.index + '"></div>';
    container.appendChild(paginationContainer);
    const pagination = document.querySelector('#pagination-' + data.index);
    pagination.innerHTML =
        '<button class="prev-btn prev-btn-' + data.index + ' btn"><i class="fas fa-arrow-left"></i></button><div class="btn-wrapper" id="btn-wrapper-' + data.index + '"></div><button class="next-btn next-btn-' + data.index + ' btn"><i class="fas fa-arrow-right"></i></button>';
    paginationContainer.appendChild(pagination);
    const btnWrapper = document.querySelector(`#btn-wrapper-${data.index}`);
    let btnsContainer = document.createElement("div");
    let currentImgCount = 1;
    const createPaginationButtons = (activePage) =>{
        if(Math.ceil(data.imageCount / data.perPage) <= 7){
            let btns = '';
            for (let page = 0; page < Math.ceil(data.imageCount / data.perPage); page++) {
                const btnElement = `<button name="${page + 1}" id="btn-${page + 1}" class="btn count-btn">${page + 1}</button>`
                btns += btnElement;
            }
            btnsContainer.innerHTML = btns
        } else if(Math.ceil(data.imageCount / data.perPage) > 7){
            let btns = '';
            if(activePage < 5){
                for (let page = 0; page < Math.ceil(data.imageCount / data.perPage); page++) {
                    if (page < 5) {
                        const btnElement = `<button name="${page + 1}" id="btn-${page + 1}" class="btn count-btn">${page + 1}</button>`
                        btns += btnElement;
                    } else if (page === 5) {
                        btns += '<button name="" id="" class="btn count-btn">...</button>';
                    } else if ((page + 1) === Math.ceil(data.imageCount / data.perPage)) {
                        const btnElement = `<button name="${page + 1}" id="btn-${page + 1}" class="btn count-btn">${page + 1}</button>`
                        btns += btnElement;
                    }
                }
                btnsContainer.innerHTML = btns
            } else if(activePage >= 5 && (Math.ceil(data.imageCount / data.perPage) - activePage) > 3 ){
                btnsContainer.innerHTML = `<button name="1" id="btn-1" class="btn count-btn">1</button><button name="" id="" class="btn count-btn" disabled>...</button><button name="${activePage - 1}" id="btn-${activePage - 1}" class="btn count-btn">${activePage - 1}</button><button name="${activePage}" id="btn-${activePage}" class="btn count-btn">${activePage}</button><button name="${activePage + 1}" id="btn-${activePage + 1}" class="btn count-btn">${activePage + 1}</button><button name="" id="" class="btn count-btn" disabled>...</button><button name="${Math.ceil(data.imageCount / data.perPage)}" id="btn-${Math.ceil(data.imageCount / data.perPage)}" class="btn count-btn">${Math.ceil(data.imageCount / data.perPage)}</button>`
            } else if((Math.ceil(data.imageCount / data.perPage) - activePage) <= 3) {
                for (let page = 0; page < Math.ceil(data.imageCount / data.perPage); page++) {
                    if (page < 1) {
                        const btnElement = `<button name="${page + 1}" id="btn-${page + 1}" class="btn count-btn">${page + 1}</button>`
                        btns += btnElement;
                    } else if(page === 1){
                        btns += '<button name="" id="" class="btn count-btn">...</button>';
                    } else if ((Math.ceil(data.imageCount / data.perPage) - 4) <= (page+1)) {
                        const btnElement = `<button name="${page + 1}" id="btn-${page + 1}" class="btn count-btn">${page + 1}</button>`
                        btns += btnElement;
                    }
                }
                btnsContainer.innerHTML = btns
            }
        }
        btnWrapper.appendChild(btnsContainer);
    }
    // createPaginationButtons(activePage);
    btnWrapper.appendChild(btnsContainer);
    for (let page = 0; page < Math.ceil(data.imageCount / data.perPage); page++) {
        let innerContainer = document.createElement("div");
        innerContainer.setAttribute("class", "inner-container");
        innerContainer.setAttribute("id", `inner-container-${page + 1}`);
        let imageCount = 0;
        if (page + 1 === Math.ceil(data.imageCount / data.perPage)) {
            imageCount = data.imageCount % data.perPage || data.perPage;
        } else {
            imageCount = data.perPage;
        }
        for (let i = 0; i < imageCount; i++) {
            let imageWrapper = document.createElement("div");
            imageWrapper.setAttribute("class", "image-wrapper");
            imageWrapper.innerHTML =
                `<article class="sigma_post">
            <div class="sigma_post-gallery">
              <img src="${data.folderPath}/${currentImgCount}.jpg" alt="post">
            </div>
          </article>`;
            innerContainer.appendChild(imageWrapper);
            currentImgCount++;
        }
        container.appendChild(innerContainer);
    }

    // const btnsArray = btnWrapper.querySelectorAll('.count-btn');
    const prevBtn = pagination.querySelector('.prev-btn');
    const nextBtn = pagination.querySelector('.next-btn');

    const showImages = (page) => {
        const innerContainer = container?.querySelector(`#inner-container-${page}`);
        const allInnerContainers = container?.querySelectorAll('.inner-container');
        allInnerContainers.forEach(container => container.style.display = 'none');
        if(innerContainer){
            innerContainer.style.display = 'grid';
        }
    }

    const updateActivePage = (page) => {
        activePage = page;
        createPaginationButtons(activePage);
        const btnsArray = btnWrapper.querySelectorAll('.count-btn');
        btnsArray.forEach(btn => btn.classList.remove('active'));
        const activeBtn = btnWrapper.querySelector(`#btn-${page}`);
        activeBtn?.classList.add('active');
        if (activePage === 1) {
            let prevBtn = document.querySelector(`.prev-btn-${data.index}`);
            prevBtn.setAttribute("disabled", true);
            let nextBtn = document.querySelector(`.next-btn-${data.index}`);
            nextBtn.removeAttribute("disabled");
        } else if (activePage === Math.ceil(data.imageCount / data.perPage)) {
            let prevBtn = document.querySelector(`.prev-btn-${data.index}`);
            prevBtn.removeAttribute("disabled");
            let nextBtn = document.querySelector(`.next-btn-${data.index}`);
            nextBtn.setAttribute("disabled", true);
        } else {
            let prevBtn = document.querySelector(`.prev-btn-${data.index}`);
            prevBtn.removeAttribute("disabled");
            let nextBtn = document.querySelector(`.next-btn-${data.index}`);
            nextBtn.removeAttribute("disabled");
        }
    }

    $(`#btn-wrapper-${data.index}`).on("click", function(event){
        if(event.target.name){
            const page = parseInt(event.target.getAttribute('name'));
            showImages(page);
            updateActivePage(page);
        }
    })

    prevBtn.addEventListener('click', () => {
        const prevPage = activePage > 1 ? activePage - 1 : activePage;
        showImages(prevPage);
        updateActivePage(prevPage);
    });

    nextBtn.addEventListener('click', () => {
        const nextPage = activePage < Math.ceil(data.imageCount / data.perPage) ? activePage + 1 : activePage;
        showImages(nextPage);
        updateActivePage(nextPage);
    });

    showImages(data.activePage);
    updateActivePage(data.activePage);
}