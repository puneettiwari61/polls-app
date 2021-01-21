class UsersController < ApplicationController

    def create
        puts "reaching here"
        user = User.new(user_params)
        if user.save
            render status: :ok, json: { notice: "Account created successfully" }   
        else
            render status: :unprocessable_entity, json: { errors: user.errors.full_messages.to_sentence }
        end
    end 


    private

        def user_params
            params.require(:user).permit(:email, :password, :password_confirmation)    
        end

end
