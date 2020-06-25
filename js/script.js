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
   //display. If not, their display property is set to none.
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



//Function to create the links to allow for pagination.
appendPageLinks = (list, listItems) => {
   
   //Determines the number of page links by taking in the length
   //of the list and dividing it by 10.
   let numberOfPages = list / 10 
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
      for (let i = 0; i < list; i++ ) {
         listItems[i].className = '';
         }
         showPage(listItems, e.target.textContent)
      }
   })
}

//Calls showPage function with page one to initially load the list
//with the correct students displayed
showPage(students, 1);

//Called to dynamically make updates based on user clicks.
appendPageLinks(students.length, students);



addSearchBar = () => {
   const searchBarDiv = document.querySelector('.page-header');
   const searchBar = document.createElement('div');
   searchBar.className = 'student-search';
   const searchInput = document.createElement('input');
   searchInput.placeholder = 'Search for students...';
   const searchButton = document.createElement('button');
   searchButton.className = 'search-button'
   searchButton.textContent = 'Search';
   searchBar.appendChild(searchInput);
   searchBar.appendChild(searchButton);
   searchBarDiv.appendChild(searchBar);
}

refreshPage = () => {
 
   for (let i = 0; i < students.length; i ++) {
      students[i].style.display = 'none';
      students[i].removeAttribute('class');
      //console.log(students[i]);
   }
   let noSearchText = document.querySelector('.no-search-results')
   if (noSearchText) {
      noSearchText.textContent = ''
   }
}

addSearchBar();

search = (list) => {
   
   let searchBar = document.querySelector('.student-search');
   
   let searchInput = searchBar.children[0];
   let studentSearch = [];
   let didntMeetCriteria = [];
   searchBar.addEventListener('click', (e) => {
      
      if (e.target.tagName === 'BUTTON') {
         debugger
         refreshPage();
         const searchTerm = searchBar.firstElementChild.value.toLowerCase();
         
         searchInput.value = '';

         for ( let i = 0; i < students.length; i++ ) { 
            
            let studentName = students[i].children[0].children[0].nextElementSibling.textContent
            if (studentName.includes(searchTerm)) {
               students[i].style.display = 'block';
               students[i].className = 'student-item cf'
               
               //console.log(studentName);
              
               studentSearch.push(students[i]);
               //console.log(studentSearch);
               
               //console.log(studentSearch.length);
            } else {
               
               students[i].remove = ('student-item cf')
               didntMeetCriteria.push(students[i]);

               //console.log(didntMeetCriteria)
            } 
         }
         if (studentSearch.length === 0) {
            
            const noSearchResults = document.createElement('H3');
            const referenceNode = document.querySelector('.student-list')
            noSearchResults.className = 'no-search-results'
            noSearchResults.textContent = 'No Search Results';
            resultsDiv.insertBefore(noSearchResults, referenceNode);
      } 
      
      const pageDiv = document.querySelector('.page')
      let existingButtonList = document.querySelector('.pagination');
      let removeButtons = pageDiv.removeChild(existingButtonList);   
         showPage(studentSearch, 1);
         
         appendPageLinks(studentSearch.length, studentSearch);         
         }
   
         
        
         
         
   })

          

}


search(students);

