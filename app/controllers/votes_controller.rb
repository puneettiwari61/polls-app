class VotesController < ApplicationController
    before_action :authenticate_user_using_x_auth_token, only: :create

    def create
			poll = Poll.find(params[:vote][:poll_id])

			unless already_voted?(poll)
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

			else
				render status: :ok, json: { notice: "You have already voted" }
			end
		end




  private
	def already_voted?(poll)
		poll.voter_ids.include?(current_user.id)
    end

    def vote_params
        params.required(:vote).permit(:poll_id, :option_id, :user_id)
    end
end
    
