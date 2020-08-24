const app = new Vue({
    el: '#app',
    data: {
        loggedIn: false,
        JWT: "",
        createUN: "",
        createPW: "",
        loginUN: "",
        loginPW: "",
        devURL: "http://localhost:3000",
        prodURL: null,
        user: null,
        token: null
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
                    this.loginUN = ""
                    this.loginPW = ""
                }
            })
        },
        handleLogout: function() {
            this.loggedIn = false;
            this.user = null;
            this.token = null;
            this.loginPW = "";
            this.loginUN = "";
        }
        
    }
})