class RegistrationsController < Devise::RegistrationsController
	
	def after_sign_in_path_for(resource)
        root_path
    end

	def new
	    super
    end

	def create
		super
        
        # make a channel for the user
        
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

