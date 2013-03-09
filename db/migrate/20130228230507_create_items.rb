class CreateItems < ActiveRecord::Migration
	def up
    create_table :items do |t|
      t.string :title
      t.string :url
      t.string :image
      t.string :description

      t.timestamps
    end
  end

  def down
  	drop_table :items
  end

end
