//for to handle user
var params = new URLSearchParams(window.location.search)

//jquery reference
var divUsers = $('#divUsers');
var boxTitle= $('#title-header')

//function to render users
function renderUsers(people) {
  //[{},{}]

//   console.log(people)

// ========  
// title to Header
  var title = ''

  
    title += '<div class="p-20 b-b">'
    title += '<h3 class="box-title"> Chat Room <small><b>'+ params.get('room') +'</b> </small> </h3>'
    title += '</div>'
    
    
    boxTitle.html(title)
// ========  

// chat-left-panel
  var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat about <span>  <b>'+ params.get('room') +'</b> </span>  </a>';
    html += '</li>';


for( var i = 0; i< people.length; i++) {

    html += '<li>';
    html +=     '<a data-id="'+ people[i].id +'" href="javascript:void(0)"> <img src="assets/images/users/'+i+'.jpg" alt="user-img" class="img-circle"/><span> '+ people[i].name +' <small class="text-success"> online </small></span> </a>';
    html += '</li>';
    }

    // divUsers will have html that we build
    divUsers.html(html)
}



