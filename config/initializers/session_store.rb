# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_checkin_session',
  :secret      => '7048de32c1d4dffa8d9b6c7adfbd0481ba77b6c61789fb6fee37c8f237d4cbfbab4874a9981b0390c2c68b0bff8bc939252ad021be81f9c67c2e8c0fedf316b7'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
