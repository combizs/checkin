class AddEmailTwitterPrintedToGuest < ActiveRecord::Migration
  def self.up
    add_column :guests, :email, :string
    add_column :guests, :twitter, :string
    add_column :guests, :printed, :boolean
  end

  def self.down
    remove_column :guests, :printed
    remove_column :guests, :twitter
    remove_column :guests, :email
  end
end
