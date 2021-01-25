class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :create

    def index
        polls = Poll.all
        render status: :ok, json: {polls: polls}
    end
    
    def create
      # params[:poll][:user_id] = current_user.id
      # poll = current_user.polls.build(poll_params)
      poll = Poll.new(poll_params)
      poll.user_id = current_user.id

      if poll.save
        # puts "#{poll.options} "
        render status: :ok, json: {notice: "Poll created successfully!", polls: poll}
      else
        render status: :unprocessable_entity, json: {errors: poll.errors.full_messages.to_sentence}
      end
    end

    def show
      poll = Poll.find(params[:id])
      options = poll.options
      render status: :ok, json: { poll: poll, options: options}
    end
  

    private

      def poll_params
        params.require(:poll).permit(:title, options_attributes: [:name])
      end        

end
    