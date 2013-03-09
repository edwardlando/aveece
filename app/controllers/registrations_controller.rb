class RegistrationsController < Devise::RegistrationsController
	
	def after_sign_in_path_for(resource)
        root_path
    end

	def new
	    super
    end

	def create
		super
        
=begin
		    @channel = Channel.new(:gender => "All",
							       :price => "All",
							       :vibe => "All",
							       :apparel => "All",
							       :user_id => resource.id,
							       :item_index => 0)

		    @channel.current_channel = true
		    @channel.save
=end

	    resource.role = "standard"
	    #resource.wishlist = Wishlist.new(:user_id => resource.id)
	    cookies[:aveece_user_id] = resource.id 
	    resource.save

	    redirect_to root_path
    end

    def destroy
    	super
    end
end

