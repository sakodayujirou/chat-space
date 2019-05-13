$(function(){

  var buildMessageHTML = function(message) {
    if (message.text && message.image) {
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.text +
          '</p>' +
          '<img src="' + message.image + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    } else if (message.text) {
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.text +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image) {
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<img src="' + message.image + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    console.log(last_message_id)
    group_id=location.href
    group_id=group_id.replace("http://localhost:3000/groups/","")
    group_id=group_id.replace("/messages","")
    console.log(group_id)
    url = "/groups/"+ group_id +"/api/messages"
    console.log(url)
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}, 
    })
  
    .done(function(messages) {
      console.log("ok")
      console.log(messages)
      $.each(messages,function(index,message) {
        var html = buildMessageHTML(message);
        $('.messages').append(html)
        $(html).ready(function() {        
          $('.lower-message__image').error(function() {           
          $(this).remove();
          });
        });
        $('html,body').animate({scrollBottom: 0}, 500, 'swing');
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
    setInterval(reloadMessages, 5000)


  $('#new_message').on('submit', function(e){
    e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      console.log(url)
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessageHTML(data);
      $('.messages').append(html)
      $('.form_message').val('');
      $(html).ready(function() {        
        $('.lower-message__image').error(function() {           
        $(this).remove();
        });
      });
      $('html,body').animate({scrollBottom: 0}, 500, 'swing');     
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
   });  
});
  