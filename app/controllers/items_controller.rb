class ItemsController < ApplicationController
  # GET /items
  # GET /items.json
  before_filter :authenticate_user!, except: [:index, :show,:create_item]
  def index
    # for infinite scrolling
   # @items = Item.order("title").page(params[:page]).per_page(10)

    @url = "http://www.ralphlauren.com/family/index.jsp?categoryId=4218845&cp=1760781&ab=ln_men_cs1_jeans"
    @item_images = Item.all.map {|img| img.image}
    #@item_images = getAllImages(@url)
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
    end
  end



  # GET /items/1
  # GET /items/1.json
  def show
    @item = Item.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/new
  # GET /items/new.json
  def new
    @item = Item.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/1/edit
  def edit
    @item = Item.find(params[:id])
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(params[:item])

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render json: @item, status: :created, location: @item }
      else
        format.html { render action: "new" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /items/1
  # PUT /items/1.json
  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end



  def create_item
    if params[:url]
      page = Nokogiri::HTML(open(params[:url]))
      images = page.css('div.container img')
      titles = page.css('figcaption')
      puts images.to_s
      links = images.map {|i| i['src']}
      links = links[0..2]
      titles = titles[0..2].map{ |t| t.to_s.split(">")[1].split("<")[0]}
      puts links.to_s
      render :json => links
      if params[:image] && params[:image] != ''
        puts ("title is " + titles[0])
        puts ("url is " + params[:url])
        puts ("image is " + params[:image])
        @item = Item.new
        @item.title = titles[0].to_s
        @item.url = params[:url]
        @item.image = params[:image]
        @item.genes = ''
        @item.views = 0
        @item.votes = 0
        puts "item is nil!" if @item.nil?
        @item.save
      end
    end
  end
end
