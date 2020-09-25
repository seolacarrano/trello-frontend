# Project Overview

## Project Link
- [Tello](https://telloapp.netlify.app/#)

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 2| Working RestAPI | Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| MVP & Bug Fixes | Complete
|Day 5| Final Touches and Present | Complete

## Project Description
For our unit03 project, we are creating a clone of the popular productivity app Trello. Users sign up and login with a custom username and password and then are taken to a mobile, tablet, and desktop application where they can add a board. In each board, they can add a card that holds a list of items tied to the specified card. Each user utilizes CRUD (i.e. create, read, update, and delete) functionality to manipulate each card and/or board on a backend server created and maintained by Ruby on Rails and SQL.

## Google Sheet
[Google Sheet](https://docs.google.com/spreadsheets/d/1V1M3Eq1NXH2PNmeTlVviRhEjX9kenq769Vo2P5mMtro/edit#gid=0) 

## Wireframes

- [mobile-menu](https://res.cloudinary.com/g31ssa/image/upload/v1598214452/Mobile%20Menu.png)
- [mobile-board](https://res.cloudinary.com/g31ssa/image/upload/v1598214510/Mobile%20Boards.png)
- [mobile-list](https://res.cloudinary.com/g31ssa/image/upload/v1598214545/MObile%20List.png)
- [tablet/desktop-menu](https://res.cloudinary.com/g31ssa/image/upload/v1598214576/Tablet%20and%20Web%20Main%20page.png)
- [tablet/desktop-board](https://res.cloudinary.com/g31ssa/image/upload/v1598214781/boards.png)
- [tablet/desktop-list](https://res.cloudinary.com/g31ssa/image/upload/v1598214753/lists.png)



## Time/Priority Matrix 

- [MVP](https://res.cloudinary.com/dpjdvsigb/image/upload/v1598750069/project-3-assets/frontend-mvp_bvlg7s.jpg)
- [PostMVP](https://res.cloudinary.com/dpjdvsigb/image/upload/v1598750382/project-3-assets/frontend-post-mvp_plwllb.jpg)

### MVP/PostMVP - 5min

#### MVP
- Create function to request data and populate for all pages
- Create function to create new data for all pages
- Create function to delete data for all pages
- Create function to edit data on all pages
- Build UI incorporating functions with Vue
- Make hamburger menu
- Make it responsive to different screen sizes (mobile, tablet, and desktop)
- Render API on frontend application

#### PostMVP 
- Make hover effect
- Add social media icons
- Add button shadow effects
- Change fonts


## Functional Components

#### MVP

| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | :---: |  :---: | :---: | :---: |
| A | Wireframing | H | 1hr | 3hr |
| B | Hamburger Menu | H | 1hr | 1hr |
| C | Login HTML | H | 1hrs | 1hr |
| D | Boards HTML | H | 3hr | 1hr |
| E | Lists HTML | H | 2hrs | 1hr |
| F | Login CSS | H | 3hrs | 2hr |
| G | Boards CSS | H | 4hrs | 4hr |
| H | Lists CSS | H | 4hrs | 4hr |
| I | Login/Board/List Modal | M | 6hr | 4hr |
| J | Edit Items Modal | M | 3hr| 3hr |
| K | Vue Research | H | 4hrs | 7hr |
| L | Vue Login Implementation | H | 2hrs | 1hr |
| M | Vue Boards Implementation | H | 1hrs | 1.5hr |
| N | Vue Lists Implementation | H | 3hrs | 3hr |
| O | Vue Items Implementation | H | 2hrs | .5hr |
| P | Login/Logout Functions | H | 2hrs | 1.5hrs |
| Q | Create Function for Boards | H | 1hrs | 1hrs |
| R | Read Function for Boards | H | 1hrs | 3hrs |
| S | Update Function for Boards | H | 4hrs | 2.5hrs |
| T | Delete Function for Boards | H | 3hrs | 1.5hrs |
| U | Create Function for List | H | 1hr | 1hr |
| V | Read Function for List | H | 2hrs | 3hrs |
| W | Update Function for List | H | 3hrs | 2hrs |
| X | Delete Function for List | H | 1hr | 1hr |
| Y | Create Function for Item | H | 3hr | 2hr |
| Z | Read Function for Item | H | 3hrs | 3hrs |
| AA | Update Function for Item | H | 3hrs | 4hrs |
| AB | Delete Function for Item | H | 1hr | 1hr |
| AC | Drag and Drop Items Research | H | 9hr | 8hrs |
| AD | Drag and Drop Items Testing and Implementation | H | 10hr | 15hr |
| AE | Login HTML/CSS Debugging | H | 1.5hr| 3hr |
| AF | Login Javascript Debugging | H | 1hr| .5hr |
| AG | Boards HTML/CSS Debugging | H | 1.5hr| 3hr |
| AH | Boards Javascript Debugging | H | 2hr| 4hr |
| AI | Lists HTML/CSS Debugging | H | 3hr| 3hr |
| AJ | Lists Javascript Debugging | H | 1hr| 2hr |
| AK | Items HTML/CSS Debugging | H | 1hr| 1hr |
| AL | Items Javascript Debugging | H | 3.5hrs | 2hr |
| AM | Blackbox Testing | H | 2hrs | 2hr |
| AN | Deployment | H | 1hrs| .5hr |
| - | Total | - | 104.5hrs | 107.5hrs |

#### PostMVP
| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | --- | :---: |  :---: | :---: |
| A | Hover effect | L | 1hr | 1.5hr |
| B | Social media icons | L | 5hrs | -hr |
| C | Add button shadow effects | L | 4hrs | .5hr |
| D | Landing Page HTML | M | 2hr | -hr |
| E | Landing Page CSS | M | 4hr | -hr |
| - | Total | - | 16hrs | 2hrs |

## Additional Libraries
- [Vue](https://vuejs.org)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

## Code Snippets

#### Edit Items Modal
- The edit modal for items, which is the blueprint for the modal for editing boards and the sign up modal. When we first implemented the code, everything on the page was highlighted when a modal popup is displayed. Once we moved the related divs below footer, it solved the problem. It was a simple solution but took some time to figure it out.
```
<a href="#popup" class="dropdown-item edit" data-abc="true">Edit</a><div id="popup" class="modalpop">
    <a href="#" class="close">&times;</a>
    <input type="text" placeholder="Edit Item" id="edit_ip" required>
    <button type="submit" id="save_edit">Edit</button>
</div>
<a href="#" class="closepop"></a>
```

### Update List Function
- The update list function updates the server with user submitted list changes and reflects those changes on the frontend of the application.

```
updateList: function(e){
        this.listID = e.target.id
        const URL = this.prodURL ? this.prodURL : this.devURL
        const updateList = {board_name: this.updateListName}
        fetch(`${URL}/boards/${this.boardID}/list/${this.listID}`, { //fetching is how we gather data from our server so this needs to be the correct route to get the correct data 
            method: "put",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `bearer ${this.token}`
            },
                body:JSON.stringify(updateList)
        })
        .then(response => {
            this.showList();
            })
        }
```

#### Drag and Drop Functions
- In order to do a drag and drop, two things were needed. The first thing was the action of dragging and dropping, and the second thing was updating the items table in the database when the item is dropped to another list. To create the appearance of drag and drop, the event listeners of ondragstart, ondrag, and ondrop, and event.preventDefault() were used on the frontend. In order to update the database, DELETE and POST HTTP requests were made to the server. The previous ids of the list and item being dragged were obtained from the div CSS selector ids of the list and item. These ids were used to make the DELETE request, When the item is dropped to the new list, the CSS selector id of the div for the new list is used to make the POST request. Since making a POST request means making a whole new item with the same content, the drag and drop function does not account for the position the user drags to. The item being dragged will only be dropped to the last position of the list. In future implementation of Tello, the drag and drop feature will be improved to take in consideration of the desired position the user wants to drag to.
```
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
```

## Issues and Resolutions

**ERROR**: When we first implemented the code, everything on the page was highlighted when a modal popup is displayed.                    
**RESOLUTION**: Once we moved the related divs below footer, it solved the problem. It was a simple solution but took some time to figure it out.
