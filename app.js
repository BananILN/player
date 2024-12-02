// const url = "https://jsonplaceholder.typicode.com";

// const getPostById = (id) =>{
//     return fetch(url + `/posts/${id}`)
//     .then((response) =>(response.json()));
// }

// const getUserPosts = (userId) =>{
//     return fetch(url + `/posts?userId=${userId}`)
//     .then((response) => response.json());
// }

// const getAllPost = () =>{
//     return fetch(url + '/posts')
//     .then((response) => response.json())
// }

// const getPostComments = (postId) =>{
// return fetch(url + `/posts/${postId}/comments`)
//     .then((response) => response.json())
// } 

// const createPost = () =>{
//     return fetch(url + "/posts",{
//         method: "POST",
//         body: JSON.stringify({
//             title: "My post",
//             body:"My first post)",
//             userId : 1,
//         }),
//         headers:{
//             "Content-type": 'application/json; charset=UTF-8',
//         },
//     })
//     .then((response) => response.json());

// }

// const updatePostById = (postId) =>{
//      return fetch(url + `/posts/${postId}`,{
//         method: 'PUT',
//         body: JSON.stringify({
//             id:1,
//             title: "New totle",
//             body: "New body",
//             userId: 1,
//         }),
//         headers:{
//             "Content-type": 'application/json; charset=UTF-8',
//         },
//     })
//     .then((response) => response.json());
// }



// createPost().then(json => console.log("POST",json));
// getPostById(1).then(json => console.log("getPOstById", json));
// getUserPosts(9).then(json =>console.log('getuserPOsts',json));
// getAllPost().then(json => console.log('allpost', json));
// getPostComments(11).then(json => console.log('Comments', json));
// updatePostById(1).then(json => console.log("updates",json));



// const getAlltodos = () =>{
//     return fetch(url + "/photos?albumId=32")
//     .then((response)=> response.json());
// }
// getAlltodos().then(json => console.log("alltodos", json));



// 1) /todos - Сколько всего задач у каждого пользователя? 20

// 2) /todos - Сколько задач выполнил пользователь с id = 9? 8

// 3) /todos - Сколько постов написал каждый пользователь? 10

// 4) /todos - Сколько комментариев под постом с id = 11? 5

// 5) /todos - Сколько комментариев под постом с id = 11? 5 

// 6) /todos - Какая почта у автора комментария с id = 104? "Gabriel@oceane.biz"

// 7) /todos - Как называется альбом с id = 84? "est et at eos expedita"

// 8) /todos - сколько фотографий в альбоме с id = 5?  50

// 8) /todos - какого цвета изображение с id = 224? фиолетовый

// 9) /todos - какой id имеет последняя фотография в альбоме с id = 32? 1600

// 10) /todos - Какой id у альбома с названием "repellendus praesentium debitis officiis"? 91


// 1-20
// 2-7
// 3-10
// 4-5
// 5-5
// 6-"Gabriel@oceane.biz"
// 7-"est et at eos expedita"
// 8-1 "https://via.placeholder.com/600/f66b97"
// 9-фиолетовый
// 10 - 91


// 1- 20
// 2-8
// 3-10
// 4-5
// 5-5
// 6-"Gabriel@oceane.biz"
// 7-"est et at eos expedita"
// 8-50
// 8-фиолетовый
// 9-1600
// 10-

function chooseFile() {
    const input = document.createElement('input');
    input.type = "file";
    
    input.onchange = function (e){
        const file = e.target.files[0];
        loadToPlayer(file);
    }

    input.click();
}

function procceslink(){
    const link = document.getElementById('linkInput').value;
    const player = document.getElementById('player');
    
    player.src = link;

    player.load();
    player.play();
}

function SetSongInfo(fileContent){
    const mp3Tags = new MP3Tag(fileContent);
    mp3Tags.read();

    const {v1:{title, artist}, v2:{ APIC } } = mp3Tags.tags;
    const coverbytes = APIC[0].data;
    const coverUrl = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(coverbytes)));
   
    document.getElementById("song").textContent = title;
    document.getElementById("artist").textContent = artist;
    document.getElementById("cover").src = coverUrl;

    
}

function loadToPlayer(file){
    const player = document.getElementById('player');

    const reader = new FileReader();

    reader.onload = (e) =>{
        const content = e.target.result;
        SetSongInfo(content);
    }

    reader.readAsArrayBuffer(file);
    
    player.src = URL.createObjectURL(file);
    player.load();
}

function initDropzone(){
    const dropzone = document.getElementById("dropzone");

    dropzone.addEventListener("dragover",(e) =>{
        e.preventDefault();
        e.stopPropagation();
    })

    dropzone.addEventListener('drop', (e)=>{
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        loadToPlayer(file);
    })

}

window.onload = () =>{
    initDropzone();
}