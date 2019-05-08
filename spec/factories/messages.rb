FactoryBot.define do
  factory :message do
    text {Faker::Lorem.sentence}
    user
    image {File.open("#{Rails.root}/public/images/profy.jpg")}
    group
  end
end
