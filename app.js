const app = new Vue ({
    el : '#app',         /* just So I don't forget el is just element */
    data : {
        loggedin: false, /* So the logic here is that based on the jwt token we recieve will switch the
                            boolean of out code so the user will be logged in and be able to taken into their boards */

        JwT : "",
        createUN: "",
        createPW: "",
        loginUN:"",
        loginPW:"",
        devURL: "http://localhost:3000",
        prodURL: null,
        user: null,
        toekn: null
    },
    methods: {
            handleLogin: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const user = {username: this.loginUN,password: this.loginPW}
            fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then((data) => {
                this.user = data.user;
                this.token = data.token;
                this.loggedin = true;
                this.loginPW = ""
                this.loginUN = ""
            });
        },
        handleLogOut: function() {
            this.loggedin = false;
            this.user=null;
            this.token=null;
        },
        handleSignup: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const user = { username: this.createUN, password: this.createPW };

            fetch(`${URL}/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            })
        },
    }
});


