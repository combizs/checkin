class Guest < ActiveRecord::Base

  validates_presence_of :name
  validates_presence_of :email
  
  before_save :remove_twitter_at_symbol
  
  named_scope :not_yet_printed, :conditions => {:printed => false}  
  named_scope :limit, lambda { |num|
    {:limit => num }
  }
  named_scope :ordered, :order => :created_at
  
    
  def form_twitter_message
    puts "Self tags: #{self.tags}"
    message = self.name
    message << " (@" + self.twitter.gsub("@", "") + ") "
    message << "from " + self.company + " checked in at !SXSW #NotSXSW."
    
    tag_intro = " Talk to him/her about "
    tags_to_use = []
    
    self.tags.each do |tag|
        tags_to_use << tag unless (message.length + tag_intro.length + tag.length + tags_to_use.join(", ").length) > 140 or tag.nil?
    end
    message << (tag_intro) + tags_to_use.join(", ") unless tags_to_use.size == 0

    if message.length > 140
      return message[0, 140]
    else
      return message
    end
  end
  
  def tags
    return [self.tag1, self.tag2, self.tag3]
  end
  
  def remove_twitter_at_symbol
    self.twitter.gsub!('@', '')
  end  
  
end
