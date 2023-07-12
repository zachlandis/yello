puts 'seeding'

user1 = User.create(email: 'user1@example.com', username: 'user1', password: 'password1')
user2 = User.create(email: 'user2@example.com', username: 'user2', password: 'password2')
user3 = User.create(email: 'user3@example.com', username: 'user3', password: 'password3')

card1 = Card.create(card_name: 'Card 1', description: Faker::Lorem.sentences)
card2 = Card.create(card_name: 'Card 2', description: Faker::Lorem.sentences)
card3 = Card.create(card_name: 'Card 3', description: Faker::Lorem.sentences)

Comment.create(body: 'Comment 1', user_id: user1.id, card_id: card1.id)
Comment.create(body: 'Comment 2', user_id: user2.id, card_id: card1.id)
Comment.create(body: 'Comment 3', user_id: user1.id, card_id: card2.id)
Comment.create(body: 'Comment 4', user_id: user3.id, card_id: card3.id)

puts 'done seeding'