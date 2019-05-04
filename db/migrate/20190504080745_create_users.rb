class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string       :name, null: false
      t.string       :e_mail, null: false
      t.string       :password, null: false

      t.timestamps
    end
  end
end