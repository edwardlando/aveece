class AddAttributesToItems < ActiveRecord::Migration
  def change
    add_column :items, :genes, :text
    add_column :items, :votes, :integer
    add_column :items, :views, :integer
  end
end


