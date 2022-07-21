let pos = {
    tickets: 0
};

function loadInformations() {
    repaint()
}

function repaint() {
    const tickets = document.getElementById('tickets-items').children[0];
    const tickets_panel = document.getElementById('tickets-list').children[0];
    if (tickets.childElementCount > 0) {
        if (pos.tickets < 0 || pos.tickets > tickets.childElementCount) pos.tickets = 0;
        let info = tickets.children[pos.tickets];
        paintCard(
            tickets_panel, 5,
            info.getElementsByClassName('id')[0].innerHTML,
            info.getElementsByClassName('wt')[0].innerHTML,
            info.getElementsByClassName('dc')[0].innerHTML,
            info.getElementsByClassName('im')[0]
        );
        // images next
        var index;
        for (let i = 1; i <= 4; i++) {
            index = pos.tickets + i;
            while (index >= tickets.childElementCount) index = index - tickets.childElementCount;
            info = tickets.children[index];
            paintCard(
                tickets_panel, (5 + i),
                info.getElementsByClassName('id')[0].innerHTML,
                info.getElementsByClassName('wt')[0].innerHTML,
                info.getElementsByClassName('dc')[0].innerHTML,
                info.getElementsByClassName('im')[0]
            );
        }
        // images prev
        for (let i = 1; i <= 4; i++) {
            index = pos.tickets - i;
            while (index < 0) index = index + tickets.childElementCount;
            info = tickets.children[index];
            paintCard(
                tickets_panel, (5 - i),
                info.getElementsByClassName('id')[0].innerHTML,
                info.getElementsByClassName('wt')[0].innerHTML,
                info.getElementsByClassName('dc')[0].innerHTML,
                info.getElementsByClassName('im')[0]
            );
        }
    } else available_panel.style.display = 'none';
}

function paintCard(cardContiner, cardPos, id, worktype, desc, images) {
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
            img.src = '/uploads/tickets/' + images.children[i].getElementsByClassName('url')[0].innerHTML;
            img.alt = images.children[i].getElementsByClassName('name')[0].innerHTML;
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

window.onload = function() {
    loadInformations();
}