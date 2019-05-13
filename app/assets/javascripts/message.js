$(function(){
  function buildHTML(message){
    var html = `<div class='message'>
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
    </div>`

    return html;
  }
  // var reloadMessages = function() {
    
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   last_message_id = $('.message:last').data('id');
  //   console.log(last_message_id)
  //   // group_id=location.href
  //   // group_id=group_id.replace("http://localhost:3000/groups/","")
  //   // group_id=group_id.replace("/messages","")
  //   // console.log(group_id)
  //   //url = "/groups/"+ group_id +"/api/messages"
  //   url = `/groups/group_id/api/messages`
  //   console.log(url)
  //   $.ajax({
  //     url: url,
  //     type: 'get',
  //     dataType: 'json',
  //     data: {id: last_message_id}
  //   })
  
  //   .done(function(messages) {
  //     //追加するHTMLの入れ物を作る
  //     console.log("ok")
  //     console.log(messages)
  //     var insertHTML = '';
  //     //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる

  //     //メッセージが入ったHTMLを取得

  //     //メッセージを追加

  //   })
  //   .fail(function() {
  //     console.log('error');
  //   });
  // };
  //   setInterval(reloadMessages, 5000)


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
      $('.form__submit').prop('disabled', false);
      var html = buildHTML(data);     
      $('.messages').append(html)
      $(html).ready(function() {        
        $('.lower-message__image').error(function() {           
        $(this).remove();
        });
      });
      $('.form_message').trigger("reset");
    })
    .fail(function(){
      alert('error');
    })
   });  
});
  