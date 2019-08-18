// $(document).on('turbolinks:load', function() {
// $(function(){
//   var user_list = $("#user-search-result");
//   var member_list = $("#chat-group-users");

//   function appendUsers(user){
//     var html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${ user.name }</p>
//                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
//                 </div>`
//     user_list.append(html);
//   }

//   function appendMembers(name, user_id){
//     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
//                   <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
//                   <p class='chat-group-user__name'>${ name }</p>
//                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
//                 </div>`
//     member_list.append(html);
//   }

//   $("#user-search-field").on("keyup", function(){
//     var input = $.trim($("#user-search-field").val());
//     $.ajax({
//       url: '/users',
//       type: "GET",
//       data: { keyword: input },
//       dataType: 'json'
//     })
//     .done(function(members){
//       $("#user-search-result").empty();
//         if (members.length !==0) {
//           members.forEach(function(user){
//             appendUsers(user);
//           })
//         }
//     })
//     .fail(function(){
//       alert('ユーザー検索に失敗しました');
//     });
//   });
//   $(function(){
//     $(document).on("click", '.user-search-add', function(){
//       var name = $(this).data("user-name");
//       var user_id = $(this).data("user-id");
//       $(this).parent().remove();
//       appendMembers(name, user_id);
//     });
//     $(document).on("click", '.user-search-remove', function(){
//       $(this).parent().remove();
//     });
//   });
// });
// })

$(function() {
  var searchField = $("#user-search-field");
  var searchResult = $("#user-search-result");
  var groupMember = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    searchResult.append(html);
  }

  function appendNoUser(notice) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ notice }</p>
                </div>`
    searchResult.append(html);
  }

  function appendMember(member) {
    var html = `<div class='chat-group-user clearfix js-chat-member', id="chat-group-user-${ member.id }">
                  <input name='group[user_ids][]' type='hidden' value='${ member.id }'>
                  <p class='chat-group-user__name'>${ member.name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ member.id }" data-user-name="${ member.name }">削除</a>
                </div>`
    groupMember.append(html);
  }

  searchField.on("keyup", function() {
    var inputName = searchField.val();

    if (inputName.length) {
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function (users) {
        searchResult.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function () {
        alert("ユーザー検索に失敗しました");
      })
    } else {
      searchResult.empty();
    }
  })

  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function () {
    var member = {};
    member.id = $(this).data("user-id");
    member.name = $(this).data("user-name");
    $(this).parent().remove();
    appendMember(member);
  })

  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function () {
    var removedUser = {};
    removedUser.id = $(this).data("user-id");
    removedUser.name = $(this).data("user-name");
    appendUser(removedUser);
    $(this).parent().remove();
  })
})