$(function(){
  function buildHTML(message){
    var html = `
    <div class='message'>
    <div class='upper-message'>
      <div class='upper-message__user-name'>
      ${message.user_name}
      </div>
      <div class='upper-message__date'>
      ${message.created_at}
      </div>
    </div>
    <div class='lower-meesage'>
    <p class='lower-message__content'>
    ${message.text}
    </p>
    <img src="${message.image}" class='lower-message__image'>
    </div>
    </div>
  `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);     
      $('.messages').append(html)
      $(html).ready(function() {        
        $('.lower-message__image').error(function() {           
            $(this).remove();
        });
    });
      $('.form__message').reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
    $(function() {
      $('.form__submit').click(function() {
        $('html,body').animate({scrollBottom: 0}, 500, 'swing');
      });
    });
   })
  });

  