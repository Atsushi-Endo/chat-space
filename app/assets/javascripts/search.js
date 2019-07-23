$(function(){
  var user_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    user_list.append(html);
  }

  function appendMembers(name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $.trim($("#user-search-field").val());
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(members){
      $("#user-search-result").empty();
        if (members.length !==0) {
          members.forEach(function(user){
            appendUsers(user);
          })
        }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
  $(function(){
    $(document).on("click", '.user-search-add', function(){
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      appendMembers(name, user_id);
    });
    $(document).on("click", '.user-search-remove', function(){
      $(this).parent().remove();
    });
  });
});