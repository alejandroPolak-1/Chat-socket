//for to handle user
var params = new URLSearchParams(window.location.search)



// var name= params.get('name');
// var room= params.get('room');

//jquery reference
var divUsers = $('#divUsers');
var TitleHeader =  $('#title-header')
var sendForm= $('#sendForm')
var txtMessage= $('#txtMessage')
var divChatbox= $('#divChatbox')



//function to render users
function renderUsers(people) {
  //[{},{}]
//   console.log(people, "PEOPLE")

// ========  
// title to Header
  var title = ''

    title += '<div class="p-20 b-b">'
    title += '<h3 class="box-title"> Chat Room <small><b>'+ params.get('room') +'</b> </small> </h3>'
    title += '</div>'
    
    
    TitleHeader.html(title)
// ========  

// chat-left-panel
  var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat about <span>  <b>'+ params.get('room') +'</b> </span>  </a>';
    html += '</li>';


for( var i = 0; i< people.length; i++) {

    html += '<li>';
    html +=     '<a data-id="' + people[i].id + '" href="javascript:void(0)"> <img src="assets/images/users/'+i+'.jpg" alt="user-img" class="img-circle"/><span> '+ people[i].name +' <small class="text-success"> online </small></span> </a>';
    html += '</li>';
    }

    // divUsers will have html that we build
    divUsers.html(html)
}

function renderMessages( data, mine) { 

     var html =''
    var date = new Date(data.date)
    var hour = date.getHours() + ':' + date.getMinutes()



    var adminClass = 'info';
    if ( data.name === 'Admin') {
        adminClass= 'danger';
    }
       
        if(mine){
            // messages I receive
            html += '<li class="reverse">';
            html += '<div class="chat-content">';
            html += '    <h5> '+ data.name +'</h5>';
            html += '    <div class="box bg-light-inverse"> '+ data.message +' </div>';
            html += '  </div>';
            // html += ' <div class="chat-img">';
            // html += '     <img src="assets/images/users/emoji.png" alt="user" />';
            // html += ' </div>';
            html += '    <div class="chat-time">'+hour+'</div>';
            html += '</li>';
        } else {
            //messages I send
            html += '<li class="animated fadeIn">';

            // if(data.name !== 'Admin') {
            //     html += '<div class="chat-img"> <img src="assets/images/users/emoji.png" alt="user" /> </div>';
            // }

            html += '<div class="chat-content">';
            html += '<h5>'+ data.name +'</h5>';
            html += '<div class="box bg-light-'+ adminClass +'"> '+ data.message +' </div>';
            html += '</div>';
            html += '<div class="chat-time">'+hour+'</div>';
            html += '</li>';
        }


    divChatbox.append(html)
}

// scroll
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// ============
// Listeners
// ============
divUsers.on('click', 'a', function () {
    var id =$(this).data('id')

    if (id){
        console.log(id);
    }
});

sendForm.on('submit', function(e){
    e.preventDefault(e)

    if (txtMessage.val().trim().length === 0){
        return
    };

    socket.emit('createMessage', {
        name: params.get('name'),
        message: txtMessage.val()
    }, function (message) {
     txtMessage.val('').focus();
     renderMessages(message, true);
     scrollBottom();
    })
})

// ============
