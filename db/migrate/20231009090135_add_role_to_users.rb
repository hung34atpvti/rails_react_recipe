class AddRoleToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :role, :integer, default: 0

    # Define the enum values
    add_index :users, :role
  end
end
