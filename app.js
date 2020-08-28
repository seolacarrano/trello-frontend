// VUE INSTANCE
const app = new Vue ({
    el : '#app',
    data : {
        loggedin: false,
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
        allLists: [],
        listInput: "",
        listID: 0,
        allItems: [],
        input:{},
        itemInput: "",
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
            //LOGIN AND LOGOUT
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
                if (data.error) {
                    alert("invalid username or password")
                } else {
                    this.user = data.user;
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
            this.boardSingle=false
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
        //BOARDS CRUD
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
                if (!data.response) {
                    this.boards = data
                } else {
                    this.boards = []
                }
            })
        },
        showBoard: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.boardID = e.target.id
            fetch(`${URL}/boards/${e.target.id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${this.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
        
                this.boardSingle = true
                this.boards = data.board_name
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
                        Authorization: `bearer ${this.token}`  
                    }
            })
            .then(response => {
                response.json()
            })
            .then(data => {
                this.getBoards()
            })

        },
        assignEditButton: function(e) {
            const editButton = document.querySelector('.board-edit')
            editButton.setAttribute("board", e.target.id)
        },
        updateBoard: function(e){
            this.boardID = e.target.attributes[3].value;
            const URL = this.prodURL ? this.prodURL : this.devURL
            const updateBoard = {board_name: this.updateBoardName}
            fetch(`${URL}/boards/${this.boardID}`, { 
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
        // LIST CRUD
        showList: function(e){
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
                    if (!data) {
                        this.allLists = ""
                    }
                } else {
                    this.allLists = []
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
                response.json()
            })
            .then(data => {
                this.refreshLists()
            })
        },
        updateList: function(e){
            this.listID = e.target.attributes[3].value;
            const URL = this.prodURL ? this.prodURL : this.devURL
            const updateList = {list_name: this.updateListName}
            fetch(`${URL}/boards/${this.boardID}/lists/${this.listID}`, {
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
        // ITEM CRUD
        createItem: function(e){
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.listID = e.target.id
            const item = {item_name: this.itemInput}
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
            const changeItem = {item_name: this.updatingItem}
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
        // DRAG AND DROP ITEMS
         dragItem: function(event){
            this.dragItemID = event.target.getAttribute('id2')
            this.dragItemListID = event.target.id
            this.dragItemContent = event.target.firstChild.firstChild.innerHTML || event.target.firstChild.innerHTML
        },
        allowDrop: function(event){
            event.preventDefault();
            event.stopPropagation();
        },
        dropItem: function(event){
            event.preventDefault()
            event.stopPropagation();
            const URL = this.prodURL ? this.prodURL : this.devURL
            const draggingItem = {item_name: this.dragItemContent}
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