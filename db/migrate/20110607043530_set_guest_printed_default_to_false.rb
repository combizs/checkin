class SetGuestPrintedDefaultToFalse < ActiveRecord::Migration
  def self.up
  	change_column :guests, :printed, :boolean, :default => false
  end

  def self.down
  	change_column :guests, :printed, :boolean, :default => nil
  end
end
