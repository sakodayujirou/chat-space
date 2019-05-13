class Api::MessagesController < ApplicationController
    def index
   # @messages = Message.where('id > ?',params[:id])
      group = Group.find(params[:group_id])
      last_message_id = params[:id].to_i
      @messages = group.messages.includes(:user).where("id > #{last_message_id}")
    #binding.pry
  end
end