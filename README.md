### Chatspace

# Ruby version
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin18]

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

# Association
- has_many :messages
- has_many :members
- has_many :group, through::members

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index|

# Association
- has_many :messages
- has_many :members
- has_many :users, through::members

## members table

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

# Association
- belongs_to :user
- belongs_to :group

## messages table

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

# Association
- belongs_to :user
- belongs_to :group