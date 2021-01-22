class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :create

    def index
        polls = Poll.all
        render status: :ok, json: {polls: polls}
    end
    
    def create
      poll = current_user.polls.build(polls_params)
      if poll.save
        render status: :ok, json: {notice: "Poll created successfully!", polls: poll}
      else
        render status: :unprocessable_entity, json: {errors: poll.errors.full_messages.to_sentence}
      end
    end

    private

      def polls_params
        params.require(:poll).permit(:title)
      end        

end
