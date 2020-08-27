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
        prodURL: "https://trelloappclone.herokuapp.com",
        user: null,
        token: null,
        boardSingle: false,
        boards: [],
        newBoard: "",
        boardName:"",
        boardID: "",
        // listResponse: false,
        allLists: [],
        listInput: "",
        listID: 0,
        allItems: [],
        input:{},
        itemID: 0,
        updatingItem: "",
        updateBoardName: "",
        updateListName: "",
        listName: ""
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
                // console.log(data)
                this.user = data.user;
                // console.log(this.user)
                this.token = data.token;
                this.loggedin = true;
                this.getBoards()
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
        .then((response) => response.json())
        .then((data) => {
            if (data.error){
                alert("sign up unsuccessful");
            } else {
                alert("sign up successful");
            };
            });
        },
        getBoards: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            fetch(`${URL}/boards`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.boards = data
            })
        },
        showBoard: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.boardID = e.target.id
            // console.log(this.boardID, e.target.id)
            fetch(`${URL}/boards/${e.target.id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.boardSingle = true
                this.boards = data.board_name
                console.log(this.boards)
            })
            .then(() => {
                this.showList()
                this.showItems()
            })
        },
        showAllBoards: function() {
            this.boardSingle = false;
            this.getBoards()
            this.allLists=""
        },
        createBoard: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const newBoard = {board_name: this.boardName}
            fetch(`${URL}/users/${this.user.id}/boards`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }, 
                body: JSON.stringify(newBoard)
            })
            .then(response => response.json())
            .then(data => {
                this.boardSingle = false
                this.getBoards()
            })
            this.boardName = "";
        },
        deleteBoard: function(e){
            this.boardID = e.target.id
            const URL = this.prodURL ? this.prodURL : this.devURL
            const board = {board_name: this.boardInput}
            fetch(`${URL}/boards/${this.boardID}`,{
                    method: "delete",
                    headers: {
                        Authorization: `bearer  ${this.token}`  
                    }
            })
            .then(response => {
                this.getBoards()
            })

            // this.getBoards()
        },
        assignEditButton: function(e) {
            const editButton = document.querySelector('.board-edit')
            editButton.setAttribute("board", e.target.id)
        },
        updateBoard: function(e){
            this.boardID = e.target.attributes[3].value;
            const URL = this.prodURL ? this.prodURL : this.devURL
            const updateBoard = {board_name: this.updateBoardName}
            fetch(`${URL}/boards/${this.boardID}`, { //fetching is how we gather data from our server so this needs to be the correct route to get the correct data 
                method: "put",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `bearer ${this.token}`
                },
                    body:JSON.stringify(updateBoard)
            })
            .then(response => {
                this.getBoards();
                })
            this.updateBoardName = "";
        },
        showList: function(e){
            this.boardID = e.target.id;
            const URL = this.prodURL ? this.prodURL : this.devURL
            fetch(`${URL}/boards/${this.boardID}/lists`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.boardSingle = true
                if (!data.response){
                    this.allLists = data
                }
            })
            // console.log(this.allLists);
            // console.log(document.querySelector(`div[id="${this.boardID}"]`).text)
        },
        refreshLists: function (){
            const URL = this.prodURL ? this.prodURL : this.devURL
            fetch(`${URL}/boards/${this.boardID}/lists`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.boardSingle = true
                if (!data.response){
                    this.allLists = data
                }
            })
        },
        createList: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const list = {list_name: this.listInput}
            fetch(`${URL}/boards/${this.boardID}/lists`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(list)
            })
            .then(response => response.json())
            .then(data => {
                this.refreshLists()
                this.listInput=""
            })
        },
        deleteList: function(e){
            this.listID = e.target.id;
            const URL = this.prodURL ? this.prodURL : this.devURL
            const list = {list_name: this.listInput}
            fetch(`${URL}/boards/${this.boardID}/lists/${this.listID}`,{
                    method: "delete",
                    headers: {
                        Authorization: `bearer  ${this.token}`  
                    }
            })
            .then(response => {
                this.refreshLists()
            })
        },
        createItem: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.listID = e.target.id
            const itemInput = this.input[this.listID]
            const item = {item_name: itemInput}
            fetch(`${URL}/boards/${this.boardID}/lists/${e.target.id}/items`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(data => {
                this.showItems()
                this.itemInput = ""
            })
        },
        showItems: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            fetch(`${URL}/boards/${this.boardID}/items`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
              this.allItems = data
            })
        },
        assignListEditButton: function(e) {
            const editButton = document.querySelector('.list-edit')
            editButton.setAttribute("list", e.target.id)
        },
        updateList: function(e){
            this.listID = e.target.attributes[3].value;
            const URL = this.prodURL ? this.prodURL : this.devURL
            const updateList = {board_name: this.updateListName}
            console.log(updateList);
            fetch(`${URL}/boards/${this.boardID}/lists/${this.listID}`, { //fetching is how we gather data from our server so this needs to be the correct route to get the correct data 
                method: "put",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `bearer ${this.token}`
                },
                    body: JSON.stringify(updateList)
            })
            .then(response => {
                this.refreshLists();
                })
            },
        editItem: function(e){
            this.itemID = e.target.id
            this.listID = e.target.getAttribute('id2')
            const item = this.allItems.find(item => {
                return item.id == this.itemID
            })
            this.updatingItem = item.item_name
        },
        updateItem: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            // this.listID = e.target.id
            // this.listID = this["list.id"]
            // console.log(this.listID)
            // console.log(this.itemID)
            const changeItem = {item_name: this.updatingItem}
            fetch(`${URL}/boards/${this.boardID}/lists/${this.listID}/items/${this.itemID}`, {
                method: "put",
                headers: {
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(changeItem)
            })
            .then(response => response.json())
            .then(data => {
              if (!data.response){
                this.showItems()
            }
            })
        },
        deleteItem: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.itemID = e.target.id
            this.listID = e.target.getAttribute('id2')
            fetch(`${URL}/boards/${this.boardID}/lists/${this.listID}/items/${this.itemID}`, {
                method: "delete",
                headers: {
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
              if (!data.response){
                this.showItems()
            }
            })
        }
    }
});