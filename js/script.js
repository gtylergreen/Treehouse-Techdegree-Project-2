//Global variables storing the student list and the children 
//in an HTML Collection.
const studentList = document.querySelector('ul');
const students = studentList.children;
const resultsDiv = document.querySelector('.page')
console.log(resultsDiv)
//console.log(students);


// Function that displays the page, taking in the list of students
// and a page number.
showPage = (list, page) => {
   //Determines the starting and ending number from the list
   //based on the page that was passed in.
   const startIndex = ( page * 10) - 10;
   const endIndex = page * 10; 
   //Loops through the list of students and checks whether they fall 
   //into the specified range for a page. If they do, they are
   //displayed. If not, their display property is set to none.
   for ( i = 0; i < list.length; i++ ) {
      if (i >= startIndex && i < endIndex ) {
         list[i].style.display = 'block';
         list[i].className = 'student-item cf'
      } else {
         list[i].style.display = 'none';
         list[i].className = '';
      }
   }
   return list;
}

//Function to create the links to allow for pagination. Takes in a list as a parameter.
appendPageLinks = (listItems) => {
   //Determines the number of page links by taking in the length
   //of the list and dividing it by 10.
   let numberOfPages = listItems.length / 10 
   //Variables for identifying where in the DOM the function will be
   //adding content.
   const pageDiv = document.querySelector('.page')
   const listDiv = document.createElement('div');
   listDiv.className = 'pagination';
   const fullList = document.createElement('ul');
   //A loop to create a link for each page and append it to the list.
   for (let i = 0; i < numberOfPages; i ++) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'active';
      link.href = '#';
      link.textContent = [i +1];
      listItem.appendChild(link);
      fullList.appendChild(listItem)
      }
   //Structure to build out the requested elements for addition to 
   //the DOM.
   listDiv.appendChild(fullList);  
   pageDiv.appendChild(listDiv); 
   //Event listener on the div with the links to take advantage of
   //bubbling and identify clicks on links. When clicked, sets the classname
   //of each student to an empty string and then calls the showPage
   //function passing in students and the text on each link to 
   //create the new view.
   listDiv.addEventListener('click', (e) => {
   if (e.target.tagName === 'A' ) {
      for (let i = 0; i < listItems.length; i++ ) {
         listItems[i].className = '';
         }
         showPage(listItems, e.target.textContent)
      }
   })
}

//function to add search input and button.
addSearchBar = () => {
   const searchBarDiv = document.querySelector('.page-header');
   const searchBar = document.createElement('div');
   searchBar.className = 'student-search';
   const searchInput = document.createElement('input');
   searchInput.placeholder = 'Search for students...';
   const searchButton = document.createElement('button');
   searchButton.className = 'search-button'
   searchButton.textContent = 'Search';
   //adds an event listener on the button and runs the search function on click.
   searchButton.addEventListener('click', () =>{
      search(students)
   })
   //appends each element to the DOM.
   searchBar.appendChild(searchInput);
   searchBar.appendChild(searchButton);
   searchBarDiv.appendChild(searchBar);
}

//Function to reset all display properties on elements.
refreshPage = () => {
   for (let i = 0; i < students.length; i ++) {
      students[i].style.display = 'none';
      students[i].removeAttribute('class');
   }
   //If there are no search results displaying on the page, removes
   //the No Search Results message.
   let noSearchText = document.querySelector('.no-search-results')
   if (noSearchText) {
      noSearchText.textContent = ''
   }
}

//function to search that is called when the search button is clicked. It takes in a list.
search = (list) => {
   let searchBar = document.querySelector('.student-search');
   let searchInput = searchBar.children[0];
   //Set up two arrays to store items that meet search criteria and those that don't.
   let studentSearch = [];
   let didntMeetCriteria = [];
   const searchTerm = searchBar.firstElementChild.value.toLowerCase();
   //Validation to ensure that the user entered something in the search input. If they
   //didn't, they will get an alert and the program exits the function.
   if (searchTerm.length <= 0 ) {
      alert('Please enter a valid search term')
      return
   } 
   //If a valid search term is entered, the refresh function is called.
   refreshPage();
   searchInput.value = '';
   //Loops through the list entered into the function and determines which items meet
   //the search criteria
   for ( let i = 0; i < list.length; i++ ) { 
      let studentName = list[i].children[0].children[0].nextElementSibling.textContent
      //If items do meet the search criteria, they are set to display and added to an array for reference
      if (studentName.includes(searchTerm)) {
         list[i].style.display = 'block';
         list[i].className = 'student-item cf'
         studentSearch.push(list[i]);
      } else {
         //If they don't meet the criteria, class to display them is removed and they are
         //added to the did not meet criteria array.
         list[i].remove = ('student-item cf')
         didntMeetCriteria.push(list[i]);
         } 
   }
   //If there are no search results, text is added to the dom alerting the user.
   if (studentSearch.length === 0) {
      refreshPage();
      const noSearchResults = document.createElement('H3');
      const referenceNode = document.querySelector('.student-list')
      noSearchResults.className = 'no-search-results'
      noSearchResults.textContent = 'No Search Results';
      resultsDiv.insertBefore(noSearchResults, referenceNode);
   }  
   //Removes existing buttons from the page
   const pageDiv = document.querySelector('.page')
   let existingButtonList = document.querySelector('.pagination');
   let removeButtons = pageDiv.removeChild(existingButtonList);   
   //Calls showPage function, passing in studentSearch array and page 1.
   showPage(studentSearch, 1);
   //Calls the appendPageLinks function to add buttons to the page based on search results.   
   appendPageLinks(studentSearch);         
}

//Calls showPage function with page one to initially load the list
//with the correct students displayed
showPage(students, 1);

//Called to dynamically make updates based on user clicks.
appendPageLinks(students);

//Called to add search element to the page.
addSearchBar();


   
