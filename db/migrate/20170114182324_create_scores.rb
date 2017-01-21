class CreateScores < ActiveRecord::Migration[5.0]
  def change
    create_table :scores do |t|
      t.references :game, foreign_key: true
      t.integer :team

      t.timestamps
    end
  end
end
