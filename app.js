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
        listName: "",
        dragItemListID: 0,
        dragItemID: 0,
        dragItemContent:"",
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
                if (data.error) {
                    alert("invalid username or password")
                } else {
                    this.user = data.user;
                    // console.log(this.user)
                    this.token = data.token;
                    this.loggedin = true;
                    this.getBoards()
                    this.loginPW = ""
                    this.loginUN = ""
                }
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
                    this.showItems()
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
        updateList: function(e){
            this.listID = e.target.attributes[3].value;
            const URL = this.prodURL ? this.prodURL : this.devURL
            const updateList = {list_name: this.updateListName}
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
            this.updateListName=""
        },
        assignListEditButton: function(e) {
            const editButton = document.querySelector('.list-edit')
            editButton.setAttribute("list", e.target.id)
        },
        createItem: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.listID = e.target.id
            console.log(this.listID)
            const itemInput = this.input[this.listID]
            console.log(itemInput)
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
              console.log(this.allItems);
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
            console.log(changeItem);
            console.log(`${URL}/boards/${this.boardID}/lists/${this.listID}/items/${this.itemID}`)
            fetch(`${URL}/boards/${this.boardID}/lists/${this.listID}/items/${this.itemID}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(changeItem)
            })
            .then(response => response.json())
            .then(data => {
                if (!data.response){
                    this.showItems()
                    console.log("hello")
                }
            })
            this.updatingItem = ""
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
        },
         // NEED TO GRAB THE TEXT AND DIV
         dragItem: function(event){
            console.log(event.target.firstChild.firstChild)
            console.log(event.target.firstChild.firstChild.innerHTML)
            // console.log(event.target.firstChild.firstChild.firstChild)
            this.dragItemID = event.target.getAttribute('id2')
            this.dragItemListID = event.target.id
            console.log(this.dragItemListID)
            console.log(this.dragItemID)
            // return draggedItem
            this.dragItemContent = event.target.firstChild.firstChild.innerHTML || event.target.firstChild.innerHTML
        },
        allowDrop: function(event){
            event.preventDefault();
            event.stopPropagation();
            console.log(5)
        },
        dropItem: function(event){
            console.log(10)
            event.preventDefault()
            event.stopPropagation();
            const URL = this.prodURL ? this.prodURL : this.devURL
            const draggingItem = {item_name: this.dragItemContent}
            console.log(draggingItem)
            console.log(event.target)
            console.log(event.target.getAttribute('listID'))
            console.log(this.boardID)
            fetch(`${URL}/boards/${this.boardID}/lists/${event.target.getAttribute('listID')}/items`, {
                // e.target will be the container that the item is dropped in
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                },
                body: JSON.stringify(draggingItem)
            })
            .then (response => response.json)
            .then (data => {
                fetch(`${URL}/boards/${this.boardID}/lists/${this.dragItemListID}/items/${this.dragItemID}`, {
                    method: "delete",
                    headers: {
                        Authorization: `bearer ${this.token}`
                    }
                })
                .then (response => response.json)
                .then(data => {
                    this.showItems()
                })
            })
        }
    }
});