class ApplicationController < ActionController::Base
    protect_from_forgery

    require 'open-uri'
    require 'nokogiri'

	def getAllImages(url)
		page = Nokogiri::HTML(open(url))
		page_images = page.css('img')
		most_common_images = most_common_height_image(page_images)
	    #image_srcs = most_common_images.map{ |i| i['src'] } 
		#image_srcs
	end

    def most_common_height_image(images)
    	sorted_by_height = images.sort_by { |img| img["height"].to_i }
    	freq = sorted_by_height.inject(Hash.new(0)) { |h,v| h[v] += 1; h }
    	most_common = sorted_by_height.sort_by { |v| freq[v] }.last
    	most_common
    end

end


