$(function() {
  var search_list = $("#user-search-result");
  var group_users = $("#chat-group-users")

  function appendUser(user) {
  var html =` <div class="chat-group-user clearfix" id="chat-user-8">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
              search_list.append(html);
  }

  function appendUser_group(id,name){
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
              group_users.append(html);
  }


 
  $(".search__query").on("keyup", function() {
    var input = $(".search__query").val();
    console.log(input)
    $.ajax({
      type: 'GET',
      url: "/users",
      data: { keyword: input },
      dataType: 'json'
    })
  
    .done(function(users) {
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        search_list.empty();
      }
    })
      
    .fail(function() {
      alert('user検索に失敗しました');
    })
  })
    $(document).on("click",".user-search-add ", function() {
      var id =$(this).attr("data-user-id")
      var name=$(this).attr("data-user-name")
      appendUser_group(id,name)
      $("#chat-user-8").remove()
    });
    $(document).on("click",".user-search-remove ", function() {
      $("#chat-group-user-8").remove()
    });
});
