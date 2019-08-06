$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
    var image = message.image ? `<img class='chat-content__image' src=${message.image} >` :"";

    var html = `<div class='chat-content' data-message-id="${message.id}">
                    <div class='chat-content__header'>
                      <div class='chat-content__name'>
                        ${message.user_name}
                      </div>
                      <div class='chat-content__date'>
                        ${message.date}
                      </div>
                    </div>
                    <div class='chat-content__message'>
                      ${message.content}
                      ${image}
                    </div>
                  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-body').append(html)
      $('.chat-body').animate({scrollTop: $(".chat-body")[0].scrollHeight}, 'fast');
    })

    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })

    .always(function(){
      $('.send-btn').prop('disabled', false);
      $('form')[0].reset();
    })
  })

  //自動更新

  var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-content:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.chat-body').append(insertHTML);
          $('form')[0].reset();
          $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');    
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
})