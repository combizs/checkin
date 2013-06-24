# Rack Dispatcher

# Require your environment file to bootstrap Rails
require "config/environment"

# Dispatch the request
run ActionController::Dispatcher.new
