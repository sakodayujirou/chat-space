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
    ${message.text}
    ${message.image}
    </div>
    </div>
  `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(this)
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
      console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      
      
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
    function scrollBottom(){
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
    }
   })
  });

  