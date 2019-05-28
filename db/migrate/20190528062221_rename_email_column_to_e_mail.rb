class RenameEmailColumnToEMail < ActiveRecord::Migration[5.0]
  def change
      rename_column :users, :email, :e_mail
  end


end
