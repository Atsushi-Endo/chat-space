$(function(){
  function buildHTML(message){
      image = ( message.image ) ? `<img class='chat-content__image' src=${message.image} >` :"";

    var html = `<div class='chat-content'>
                    <div class='chat-content__header'>
                      <div class='chat-content__name'>
                        ${message.name}
                      </div>
                      <div class='chat-content__date'>
                        ${message.date}
                      </div>
                    </div>
                    <div class='chat-content__message'>
                      ${message.content}
                      ${image}
                    </div>
                  </div>`;
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
      $('.chat-footer__message').val('')
      $('.hidden')  .val('')
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })
});