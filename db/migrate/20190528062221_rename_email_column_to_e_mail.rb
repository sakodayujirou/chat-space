class RenameEmailColumnToEMail < ActiveRecord::Migration[5.0]
  def up
      rename_column :users, :email, :e_mail
  end

  def down
  end

end
