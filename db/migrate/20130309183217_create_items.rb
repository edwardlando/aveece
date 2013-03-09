class CreateItems < ActiveRecord::Migration
  def up
    create_table :items do |t|
      t.string :title
      t.string :url
      t.string :image
      t.text :genes
      t.integer :votes
      t.integer :views

      t.timestamps
    end
  end

  def down
    drop_table :items
  end

end
