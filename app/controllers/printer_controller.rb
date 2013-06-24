class PrinterController < ApplicationController
  def next
    num = params[:num] || 1
    render :json => Guest.not_yet_printed.limit(num).ordered
  end
  
  def printer
    
  end

end
