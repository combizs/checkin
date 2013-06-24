class AddTagsToGuest < ActiveRecord::Migration
  def self.up
    add_column :guests, :tags, :string
  end

  def self.down
    remove_column :guests, :tags
  end
end
