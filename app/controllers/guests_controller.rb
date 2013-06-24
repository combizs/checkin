require "rubygems"
require "twitter"

class GuestsController < ApplicationController
  # GET /guests
  # GET /guests.xml
  def index
    @guests = Guest.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @guests }
      format.mobile
    end
  end

  # GET /guests/1
  # GET /guests/1.xml
  def show
    @guest = Guest.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @guest }
      format.mobile
    end
  end

  # GET /guests/new
  # GET /guests/new.xml
  def new
    @guest = Guest.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @guest }
      format.mobile
    end
  end

  # GET /guests/1/edit
  def edit
    @guest = Guest.find(params[:id])
  end

  # POST /guests
  # POST /guests.xml
  def create
    @guest = Guest.new(params[:guest])

    respond_to do |format|
      if @guest.save
        #flash[:notice] = 'Guest was successfully created.'
        # format.html { redirect_to(@guest) }
        # format.xml  { render :xml => @guest, :status => :created, :location => @guest }

        # Start Twitter Code

        # Certain methods require authentication. To get your Twitter OAuth credentials,
        # register an app at http://dev.twitter.com/apps
        Twitter.configure do |config|
          config.consumer_key = "8vOsSTFSt0oVzCHDRNTtLQ"
          config.consumer_secret = "L4XEVqUVkT3qIkKUUGnquDbTcmiDBXSwkamQJbviJU"
          config.oauth_token = "265677811-Ri1JKQeQ57RJuoqcF27jKxFNOI0blNwH6GAjNpir"
          config.oauth_token_secret = "is8PsbguT44A9t7I0tSlSFnBXEdYeDnlyBCaLdN0"
        end
        
        # Initialize your Twitter client
        #client = Twitter::Client.new
        
        # Post a status update
          
        @message = @guest.form_twitter_message
        puts "Message: #{@message}"
        
        #client.update("I just posted a status update via the Twitter Ruby Gem!")
        #client.update(@message)
        
        # End Twitter Code
        
        flash[:notice] = "Thanks for registering! Your label will be printed in the order in which it was received."
        format.html { redirect_to("/guests/checkin") }
        format.mobile { redirect_to("/guests/checkin") }
      else
        flash[:error] = "We couldn't accept your checkin because of the following:"
        @guest.errors.full_messages.each do |message|
          flash[:error] << "<br />#{message}"
        end
        format.html { render :action => "new" }
        format.mobile { render :action => "checkin" }
        format.xml  { render :xml => @guest.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /guests/1
  # PUT /guests/1.xml
  def update
    @guest = Guest.find(params[:id])

    respond_to do |format|
      if @guest.update_attributes(params[:guest])
        flash[:notice] = 'Guest was successfully updated.'
        format.html { redirect_to(@guest) }
        format.mobile { redirect_to(@guest) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.mobile { render :action => "edit" }
        format.xml  { render :xml => @guest.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /guests/1
  # DELETE /guests/1.xml
  def destroy
    @guest = Guest.find(params[:id])
    @guest.destroy

    respond_to do |format|
      format.html { redirect_to(guests_url) }
      format.mobile { redirect_to(guests_url) }
      format.xml  { head :ok }
    end
  end

  # GET /guests/checkin
  # GET /guests/checkin.xml
  def checkin
    @guest = Guest.new
    
    respond_to do |format|
      format.html # checkin.html.erb
      format.mobile # checkin.mobile.erb
      format.xml  { render :xml => @guest }
    end
  end
  
  def checkin_success
    
  end

end
