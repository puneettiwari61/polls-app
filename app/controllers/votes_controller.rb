class VotesController < ApplicationController
    before_action :authenticate_user_using_x_auth_token, only: :create

    def create
			poll = Poll.find(params[:vote][:poll_id])

			unless has_user_voted?(poll)
					params[:vote][:user_id] = current_user.id
					vote = Vote.new(vote_params)
				if vote.save
					option = poll.options.detect{ |option| option.id == vote.option_id  }
					puts "#{vote.option_id} vote"
					puts "#{option} its a option" 
					option.increment!(:vote_count)
					render status: :ok, json: { notice: "You have voted successfully" }
				else
					render status: :unprocessable_entity, json: { errors: @vote.errors.full_messages }
				end
			end
		end




  private
    def has_user_voted?(poll)
        poll.voter_ids.include?(current_user.id)
    end

    def vote_params
        params.required(:vote).permit(:poll_id, :option_id, :user_id)
    end
end
    
