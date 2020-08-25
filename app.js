const app = new Vue({
    el: '#app',
    data: {
        loggedIn: false,
        lists: false,
        JWT: "",
        createUN: "",
        createPW: "",
        loginUN: "",
        loginPW: "",
        devURL: "http://localhost:3000",
        prodURL: "https://trelloappclone.herokuapp.com",
        user: null,
        token: null,
        boards: [],
        newBoard: "",
        userId: null
    },
    methods: {
        handleSignup: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.createUN, password: this.createPW}

            fetch(`${URL}/users`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('sign up unsuccessful')
                } else {
                    alert('signup successful')
                }
            })
            this.createPW = ""
            this.createUN = ""
        },

        handleLogin: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.loginUN, password: this.loginPW}

            fetch(`${URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('invalid username or password')
                } else {
                    this.user = data.user
                    this.token = data.token
                    this.loggedIn = true
                    this.getBoards()
                    this.loginUN = ""
                    this.loginPW = ""
                    this.userId = data.user.id
                    console.log(data.user.id)
                }
            })
        },
        handleLogout: function() {
            this.loggedIn = false;
            this.user = null;
            this.token = null;
            this.loginPW = "";
            this.loginUN = "";
        },
        getBoards: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL
            fetch(`${URL}/boards`, {
                method: "get",
                headers: {
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.boards = data
                console.log(this.boards[0].board_name)
            })
        },
        createBoard: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const board = {"board_name": this.newBoard}

            fetch(`${URL}/users/${this.userId}/boards`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${this.token}`
                },
                body: JSON.stringify(board)
            })
            this.getBoards()
            this.newBoard = ""
        }
        
    }
})