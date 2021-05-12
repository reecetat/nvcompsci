let vue = function() {
      var quiz = {
        title: 'The Food Quiz',
        
        questions: [
          {
            text: "What's your all-time favorite food?",
            response: [
              {text: 'Chicken Shawarma', value: 'GrapeLeafExpress'},
              {text: 'Chicken Nuggets', value: 'McDonalds'},
              {text: 'Fettucini Alfredo', value: 'OliveGarden'},
              {text: 'Baby Back Ribs', value: 'CityBBQ'},
            ]
          }, {
            text: "What's your favorite comfort dish?",
            response: [
              {text: 'Spaghetti', value: 'OliveGarden'},
              {text: 'Hamburger', value: 'McDonalds'},
              {text: 'Pulled Pork', value: 'CityBBQ'},
              {text: 'Grape Leaves', value: 'GrapeLeafExpress'},
            ]
          }, {
            text: "What is the best kind of pizza?",
            response: [
              {text: 'Meat Lovers', value: 'CityBBQ'},
              {text: 'Pita Bread Pizza', value: 'GrapeLeafExpress'},
              {text: 'Stromboli', value: 'OliveGarden'},
              {text: 'Chicacgo Style', value: 'McDonalds'},
            ]
          }, {
            text: "Do you prefer",
            response: [
              {text: 'Quick in and out', value: 'McDonalds'},
              {text: 'Passionate staff', value: 'GrapeLeafExpress'},
              {text: 'Community meals', value: 'CityBBQ'},
              {text: 'Fine dining', value: 'OliveGarden'},
            ]
          }, {
            text: "What is your ideal price range?",
            response: [
              {text: '20$+', value: 'OliveGarden'},
              {text: '$1-$5', value: 'McDonalds'},
              {text: '$8-$12', value: 'GrapeLeafExpress'},
              {text: '$12-$15', value: 'CityBBQ'},
            ]
          }
        ]
      };

      new Vue({
        el: '#app',
        data: {
          quiz: quiz,
          questionIndex: 0,
          responseTracker: {
            GrapeLeafExpress: 0,
            McDonalds: 0,
            OliveGarden: 0,
            CityBBQ: 0
          },
          userResponses: []
        },
        methods: {
          next(value) {
            if(value == 'GrapeLeafExpress') {
              this.responseTracker.GrapeLeafExpress++;
            } else if(value == 'McDonalds') {
              this.responseTracker.McDonalds++;
            } else if(value == 'OliveGarden') {
              this.responseTracker.OliveGarden++;
            } else if (value == 'CityBBQ') {
              this.responseTracker.CityBBQ++;
            }

            this.questionIndex++;
          },
          prev() {
            this.questionIndex--;
          },
          restart(){
            this.questionIndex = 0;

            this.responseTracker.GrapeLeafExpress = 0;
            this.responseTracker.McDonalds
= 0;
            this.responseTracker.OliveGarden
= 0;
  this.responseTracker.CityBBQ
= 0;
          },
          result() {
            let obj = this.responseTracker;
            return Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
          }
        }
      });
    }

    vue();


const $resultsContainer = document.getElementById("results")
const $usersContainer = document.getElementById("users")
document.getElementById("login")
    .onsubmit = login
document.getElementById("createresult")
    .onsubmit = createresult

spawnResult()

spawnUsers()
let user_id

function createresult(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            text: document.getElementById("newresult").value
        }),
        method: "result",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/results", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "result",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            user_id = res.userId
        })
        .catch(error => console.error(error))
}

function spawnResult() {
   fetch("/result")
    .then(res => res.json())
    .then(result => {
        const resultHTML = result.map( result => `
        <div class="result">
            <p>${result.content}</p>
            <div class="details">
                <div>${result.userid}</div>
            </div>
        </div>
        ` ).join("")
        $resultsContainer.innerHTML = resultsHTML
    })
    .catch(err => console.error(err))
   
}

function spawnUsers() {
    fetch("/users")
     .then(res => res.json())
     .then(users => {
         const usersHTML = users.map( user => `
         <div class="user" data-userid=${user.id}>
             <p>${user.username}</p>
             <div class="details">
                 <div>${user.firstName}</div>
             </div>
             <button onclick="e => {addFriend(e);}">Add Friend</button>
         </div>
         ` ).join("")
         $usersContainer.innerHTML = usersHTML
     })
     .catch(err => console.error(err))
    
 }

function addFriend(e) {
    const $userDiv = e.target.parentElement
    const friend_id = $userDiv.userid

    const payload = {
        body: JSON.stringify({
            user_id: user_id,
            friend_id: friend_id
        }),
        method: "result",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/friends", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function loadData() {
    return {
        results: [
            {
              //These are examples from you that I didn't bother to change due to lack of time
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            },
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            },
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            },
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            }
        ],
        users: [
            {
                username: "kimmy23",
                firstName: "Kimberly",
                lastName: "Bash",
                gender: "F",
                age: 45
            },
            {
                username: "wordup",
                firstName: "John",
                lastName: "Word",
                gender: "M",
                age: 31
            },
            {
                username: "dogguy23",
                firstName: "Rob",
                lastName: "Obeneur",
                gender: "M",
                age: 62
            },
            {
                username: "silentninja84",
                firstName: "Lesa",
                lastName: "Kirkland",
                gender: "F",
                age: 17
            }
        ]
    }
}

