const urlPrefix = 'https://todorestapi-20432433159e.herokuapp.com/api/todos/'
const requestUrl = urlPrefix + 'posts'
const requestUserUrl = 'https://todorestapi-20432433159e.herokuapp.com/api/users/'

let posts = [];
let users = [];

async function loadData(callback) {
    posts = await fetch(urlPrefix).then(x=>x.json());
    users = await fetch(requestUserUrl).then(x=>x.json());

    callback.apply();
};


const content = document.querySelector('.content');

function render() {
    content.innerHTML='';
    for (let i = 0; i < posts.length; i++) {
        const currPost = posts[i];
        if (currPost) { 
            content.innerHTML += `
            <div class="post">
            <p><strong><a data-todoId="${currPost.id}" href="/${currPost.id}/">Todo id: </a> </strong> ${currPost.id}</p>
            <p><strong>Oluşturulma Zamanı:</strong> ${currPost.created_at}</p>        
            <p><strong>Güncellenme:</strong> ${currPost.updated_at}</p>        
            <p><strong>Başlık: </strong> ${currPost.title}</p>        
            <p><strong>Tamamlanma:</strong> ${currPost.completed}</p>        
            <p><strong><a data-actorId="${currPost.actor}" href="/${currPost.actor}/"> actor: </a></strong> ${currPost.actor}</p>        
            <p><strong><a data-assigneeId="${currPost.assignee}" href="/${currPost.assignee}/"> Atanan: </a></strong> ${currPost.assignee}</p>        
            </div>
            `;
        }
    }

    bindPostClicks();
};
loadData(function () {
    render();
});


function renderActorDetail(actorDetailResponse) {
    content.innerHTML = `
    <div class="post">
            <div class=details>
                <p><strong>Kullanıcı id:</strong> ${actorDetailResponse.id}</p>
                <p><strong>Son Giriş:</strong> ${actorDetailResponse.last_login}</p>        
                <p><strong>Admin</strong> ${actorDetailResponse.is_superuser}</p>        
                <p><strong>Kullanıcı Adı: </strong> ${actorDetailResponse.username}</p>        
                <p><strong>İsim:</strong> ${actorDetailResponse.first_name}</p>        
                <p><strong>Soyisim:</strong> ${actorDetailResponse.last_name}</p>        
                <p><strong>Email:</strong> ${actorDetailResponse.email}</p>        
                <p><strong>Çalışan mı?:</strong> ${actorDetailResponse.is_staff}</p>        
                <p><strong>Aktif mi?:</strong> ${actorDetailResponse.is_active}</p>        
                <p><strong>Katıldığı tarih:</strong> ${actorDetailResponse.date_joined}</p>        
                <p><strong>Grup:</strong> ${actorDetailResponse.groups}</p>
            </div>
            <div class="button">
            <button id="goBackBtn">Geri Dön</button>
            </div>      
    </div>
    `;
    const goBackBtn = document.querySelector('#goBackBtn');
    goBackBtn.addEventListener('click', function () {
        loadData(function () {
            render();
        });
    });
};

function renderAssigneeDetail(assigneeDetailResponse) {
    content.innerHTML = `
    <div class="post">
            <div class=details>
                <p><strong>Kullanıcı id:</strong> ${assigneeDetailResponse.id}</p>
                <p><strong>Son Giriş:</strong> ${assigneeDetailResponse.last_login}</p>        
                <p><strong>Admin</strong> ${assigneeDetailResponse.is_superuser}</p>        
                <p><strong>Kullanıcı Adı: </strong> ${assigneeDetailResponse.username}</p>        
                <p><strong>İsim:</strong> ${assigneeDetailResponse.first_name}</p>        
                <p><strong>Soyisim:</strong> ${assigneeDetailResponse.last_name}</p>        
                <p><strong>Email:</strong> ${assigneeDetailResponse.email}</p>        
                <p><strong>Çalışan mı?:</strong> ${assigneeDetailResponse.is_staff}</p>        
                <p><strong>Aktif mi?:</strong> ${assigneeDetailResponse.is_active}</p>        
                <p><strong>Katıldığı tarih:</strong> ${assigneeDetailResponse.date_joined}</p>        
                <p><strong>Grup:</strong> ${assigneeDetailResponse.groups}</p>
            </div>
            <div class="button">
            <button id="goBackBtn">Geri Dön</button>
            </div>      
    </div>
    `;
    const goBackBtn = document.querySelector('#goBackBtn');
    goBackBtn.addEventListener('click', function () {
        loadData(function () {
            render();
        });
    });
};

function renderTodoDetail(todoDetailResponse) {
    content.innerHTML = `
    <div class="post">
            <div class=details>
                <p><strong>id:</strong> ${todoDetailResponse.id}</p>
                <p><strong>Oluşturulma Tarihi</strong> ${todoDetailResponse.created_at}</p>        
                <p><strong>Güncellenme Tarihi</strong> ${todoDetailResponse.updated_at}</p>        
                <p><strong>Başlık</strong> ${todoDetailResponse.title}</p>        
                <p><strong>Tamamlanma</strong> ${todoDetailResponse.completed}</p>        
                <p><strong><a data-actorId="${todoDetailResponse.actor}" href="/${todoDetailResponse.actor}/"> actor: </a></strong> ${todoDetailResponse.actor}</p>        
                <p><strong><a data-assigneeId="${todoDetailResponse.assignee}" href="/${todoDetailResponse.assignee}/"> Atanan: </a></strong> ${todoDetailResponse.assignee}</p>        
            </div>
            <div class="button">
            <button id="goBackBtn">Geri Dön</button>
            </div>      
    </div>
    `;
    const goBackBtn = document.querySelector('#goBackBtn');
    goBackBtn.addEventListener('click', function () {
        loadData(function () {
            render();
        });
    });
};


async function loadActorDetailPage(actorId) {
    const actorDetailResponse = await fetch('https://todorestapi-20432433159e.herokuapp.com/api/users/' + actorId +'/').then(x=>x.json());
    renderActorDetail(actorDetailResponse);
}
async function loadAssigneeDetailPage(assigneeId) {
    const assigneeDetailResponse = await fetch('https://todorestapi-20432433159e.herokuapp.com/api/users/' + assigneeId +'/').then(x=>x.json());
    renderAssigneeDetail(assigneeDetailResponse);
}
async function loadTodoDetailPage(todoId) {
    const todoDetailResponse = await fetch('https://todorestapi-20432433159e.herokuapp.com/api/todos/' + todoId +'/').then(x=>x.json());
    console.log(todoDetailResponse);
    renderTodoDetail(todoDetailResponse);
}

function loadDetail(e) {
    e.preventDefault();
    loadTodoDetailPage(this.dataset.todoid);
    loadActorDetailPage(this.dataset.actorid);
    loadAssigneeDetailPage(this.dataset.assigneeid)    
}
function bindPostClicks() {
    document.querySelectorAll('.post p strong a').forEach(x => x.addEventListener('click',loadDetail));
}

const newTodoForm = document.querySelectorAll('newTodoForm');
const sendNewTodoBtn = document.querySelector('#sendNewTodo');
sendNewTodoBtn.addEventListener('click', sendNewTodo)

async function sendNewTodo(sendIt) {
fetch('https://todorestapi-20432433159e.herokuapp.com/api/todos/create/', {
    method: 'POST',
    body: JSON.stringify({
        title: newTodoForm.title,
        completed: boolean,
        actor: actorId,
        assignee: assigneeId
    }),
    headers: {
        'Content-type': 'application/json;'
    }
}
);
    sendIt.apply();
};
