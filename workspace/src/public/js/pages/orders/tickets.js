let pos = {
    available: 0,
    requested: 0
};

function available(opt, times) {
    const available = document.getElementsByClassName('available');
    console.log(available);
    if (opt == 'next') {

    } else if (opt == 'prev') {
        
    }
}

function loadInformations() {
    repaint()
}

function repaint() {
    const available = document.getElementById('ticketsItems').children[0];
    const requested = document.getElementById('ticketsItems').children[1];
    const iduser = document.getElementById('ticketsItems').children[2].innerHTML;
    const available_panel = document.getElementById('available-items').children[0];
    const requested_panel = document.getElementById('requested-items').children[0];
    if (available.childElementCount > 0) {
        if (pos.available < 0 || pos.available > (available.childElementCount - 1)) pos.available = 0;
        let info = available.children[pos.available];
        paintCard(
            available_panel, 5, iduser,
            info.getElementsByClassName('id')[0].innerHTML,
            info.getElementsByClassName('wt')[0].innerHTML,
            info.getElementsByClassName('dc')[0].innerHTML,
            info.getElementsByClassName('im')[0]
        );
        // images next
        var index;
        for (let i = 1; i <= 4; i++) {
            index = pos.available + i;
            while (index >= available.childElementCount) index = index - available.childElementCount;
            info = available.children[index];
            paintCard(
                available_panel, (5 + i), iduser,
                info.getElementsByClassName('id')[0].innerHTML,
                info.getElementsByClassName('wt')[0].innerHTML,
                info.getElementsByClassName('dc')[0].innerHTML,
                info.getElementsByClassName('im')[0]
            );
        }
        // images prev
        for (let i = 1; i <= 4; i++) {
            index = pos.available - i;
            while (index < 0) index = index + available.childElementCount;
            info = available.children[index];
            paintCard(
                available_panel, (5 - i), iduser,
                info.getElementsByClassName('id')[0].innerHTML,
                info.getElementsByClassName('wt')[0].innerHTML,
                info.getElementsByClassName('dc')[0].innerHTML,
                info.getElementsByClassName('im')[0]
            );
        }
    } else available_panel.style.display = 'none';
    if (requested.childElementCount > 0) {
        if (pos.requested < 0 || pos.requested > (requested.childElementCount - 1)) pos.requested = 0;
        let info = requested.children[pos.requested];
        paintCard(
            requested_panel, 5, iduser,
            info.getElementsByClassName('id')[0].innerHTML,
            info.getElementsByClassName('wt')[0].innerHTML,
            info.getElementsByClassName('dc')[0].innerHTML,
            info.getElementsByClassName('im')[0]
        );
        // images next
        var index;
        for (let i = 1; i <= 4; i++) {
            index = pos.requested + i;
            while (index >= requested.childElementCount) index = index - requested.childElementCount;
            info = requested.children[index];
            paintCard(
                requested_panel, (5 + i), iduser,
                info.getElementsByClassName('id')[0].innerHTML,
                info.getElementsByClassName('wt')[0].innerHTML,
                info.getElementsByClassName('dc')[0].innerHTML,
                info.getElementsByClassName('im')[0]
            );
        }
        // images prev
        for (let i = 1; i <= 4; i++) {
            index = pos.requested - i;
            while (index < 0) index = index + requested.childElementCount;
            info = requested.children[index];
            paintCard(
                requested_panel, (5 - i), iduser,
                info.getElementsByClassName('id')[0].innerHTML,
                info.getElementsByClassName('wt')[0].innerHTML,
                info.getElementsByClassName('dc')[0].innerHTML,
                info.getElementsByClassName('im')[0]
            );
        }
    } else requested_panel.style.display = 'none';
}

function paintCard(cardContiner, cardPos, iduser, id, worktype, desc, images) {
    const container = document.createElement('section');
    container.className = 'card-container';
    // load title
    let subContainer = document.createElement('section');
    subContainer.className = 'card-title';
    const t_tag = document.createElement('h4');
    t_tag.innerText = id;
    subContainer.appendChild(t_tag);
    const wt_tag = document.createElement('p');
    wt_tag.innerText = worktype;
    subContainer.appendChild(wt_tag);
    container.appendChild(subContainer);
    //load description
    subContainer = document.createElement('section');
    subContainer.className = 'card-footer';
    const desc_tag = document.createElement('p');
    desc_tag.innerText = desc;
    subContainer.appendChild(desc_tag);
    container.appendChild(subContainer);
    // load images
    if (images != undefined) {
        subContainer = document.createElement('section');
        subContainer.className = 'card-background';
        const img_container = document.createElement('ul');
        for (let i = 0; i < images.childElementCount; i++) {
            let img = document.createElement('img');
            img.src = '/uploads/tickets/' + iduser + '/' + images.children[i].innerText;
            img.alt = 'notFound';
            let img_li = document.createElement('li');
            img_li.appendChild(img);
            img_container.appendChild(img_li);
        }
        subContainer.appendChild(img_container);
        container.appendChild(subContainer);
    }
    // add to web
    const li_container = document.createElement('li');
    li_container.className = 'item_' + cardPos;
    li_container.appendChild(container);
    cardContiner.appendChild(li_container);
}

function changeStatusFilter() {
    
}

window.onload = function() {
    loadInformations();
}