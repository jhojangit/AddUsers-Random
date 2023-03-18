async function main() {
    let db = {
        user: await getData(),
        localSt: JSON.parse(window.localStorage.getItem("usersInMemory")) || [],
    };

    printUser(db);
    btnNext();
    saveUser(db);
    showLocalUsers(db);
    deleteUser(db)
}

async function getData() {
    let data = await fetch("https://randomuser.me/api/");
    let us = await data.json();
    return us;
}

function printUser(db) {
    let containerHTML = document.querySelector(".container");
    let user = db.user.results[0];

    html = "";

    let content = `
            <div class="card">
                    <div class="img_container">
                        <img src="${user.picture.large}" alt="img-user">
                    </div>
                    <div class="body_user">
                        <div class="name_container">
                            <h4>Name: ${user.name.first} ${user.name.last} </h4>
                        </div>
                        <div class="age_container">
                            <h5>Age: ${user.dob.age}</h5>
                        </div>
                        <div class="country_container">
                            <h4>Country: ${user.location.country}</h4>
                        </div>
                        <div class="email_container">
                            <p><b>Email</b>: ${user.email} </p>
                        </div>
                    </div>

                    <div class="btn_container"> 
                        <button class="save_btn">Save 💾</button>
                        <button class="next_btn">Next ➡️</button>
                    </div>

            </div>
    `;

    html = content;
    containerHTML.innerHTML = html;
}

function btnNext() {
    let btnNextHTML = document.querySelector(".next_btn");
    btnNextHTML.addEventListener("click", () => {
        main();
        window.location.reload();
    });
}

function saveUser(db) {
    let btnNextHTML = document.querySelector(".save_btn");
    btnNextHTML.addEventListener("click", () => {
        const imgUser = db.user.results[0].picture.large;
        const nameUser = db.user.results[0].name.first;
        const lastUser = db.user.results[0].name.last;
        const ageUser = db.user.results[0].dob.age;
        const countryUser = db.user.results[0].location.country;
        const emailUser = db.user.results[0].email;

        let newUser = {
            imgUser,
            nameUser,
            lastUser,
            ageUser,
            countryUser,
            emailUser,
        };

        let length = db.localSt.length;

        db.localSt[length] = newUser;

        window.localStorage.setItem("usersInMemory", JSON.stringify(db.localSt));
        main();
    });
}

function showLocalUsers(db) {
    let containerNewHTML = document.querySelector(".containerNewUsers");

    let html = "";

    for (const i in db.localSt) {

        let content = `
                <div class="card_newUser">
                    <div class="img_container">
                        <img src="${db.localSt[i].imgUser}" alt="img-user">
                    </div>
                    <div class="body_user">
                        <div class="name_container">
                            <h4>Name: ${db.localSt[i].nameUser} ${db.localSt[i].lastUser} </h4>
                        </div>
                        <div class="age_container">
                            <h5>Age: ${db.localSt[i].ageUser}</h5>
                        </div>
                        <div class="country_container">
                            <h4>Country: ${db.localSt[i].countryUser}</h4>
                        </div>
                        <div class="email_container">
                            <p><b>Email</b>: ${db.localSt[i].emailUser} </p>
                        </div>
                    </div>
                    <button class="btnDeleteUser" id="${i}">Delete</button>
                </div>
                `;

        html += content;
    }

    containerNewHTML.innerHTML = html;
}

function deleteUser(db) {
    let btnDeleteHTML = document.querySelector('.containerNewUsers')


    btnDeleteHTML.addEventListener('click', e => {
        if(e.target.classList.contains('btnDeleteUser')){
            let idUser = Number(e.target.id)

            db.localSt.splice(idUser,1)

        }
        window.localStorage.setItem("usersInMemory", JSON.stringify(db.localSt));

        showLocalUsers(db)
    })

    

}

main();
