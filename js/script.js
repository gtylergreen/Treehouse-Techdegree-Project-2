//Global variables storing the student list and the children 
//in an HTML Collection.
const studentList = document.querySelector('ul');
const students = studentList.children;

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
         students[i].style.display = 'block';
         students[i].className = 'student-item cf'
      } else {
         students[i].style.display = 'none';
      }
   }
}

//Function to create the links to allow for pagination.
appendPageLinks = (list) => {
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
      for (let i = 0; i < students.length; i++ ) {
         students[1].className = '';
         }
         showPage(students, e.target.textContent)
      }
   })
}

//Calls showPage function with page one to initially load the list
//with the correct students displayed
showPage(students, 1);

//Called to dynamically make updates based on user clicks.
appendPageLinks(students.length);
