json.user_name  @message.user.name
json.content    @message.content
json.image_url  @message.image.url
json.date       @message.created_at.strftime('%Y年%m月%d日%H時%M分')
json.id         @message.id