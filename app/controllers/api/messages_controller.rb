class Api::MessagesController < ApplicationController
  def index
    #binding.pry
    puts "-----------"
    puts "apiコントローラー"
    puts "-----------"
    @messages = Message.where('id > ?',params[:id])
  end
end