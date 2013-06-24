class AddSeparateTagsToGuest < ActiveRecord::Migration
  def self.up
  	add_column :guests, :tag1, :string
  	add_column :guests, :tag2, :string
  	add_column :guests, :tag3, :string
	Guest.all.each do |guest|
		tags = guest.tags.split(', ')
		guest.tag1 = tags[0]
		guest.tag2 = tags[1]
		guest.tag3 = tags[2]
		guest.save!
	end
	remove_column :guests, :tags
  end

  def self.down
  	add_column :guests, :tags, :string
  	Guest.all.each do |guest|
		guest.tags = "#{guest.tag1}, #{guest.tag2}, #{guest.tag3}"
		guest.save!
	end
  	remove_column :guests, :tag1
  	remove_column :guests, :tag2
  	remove_column :guests, :tag3
  end
end
