# cryptonate_backend

## Routes to access API:

### Campaigns collection:

#### CAMPAIGN SCHEMA
- author_id: String (required)
- title: String (required)
- date_created: Date (defaults to now)
- date_end: Date
- image: file (png or jpeg)
- tags: Array
- description: String (required)
- goal: Number (required)

#### "/api/campaigns"  
- GET all campaigns
- POST a campaign - use form-data instead of json for this

#### "/api/campaigns/:id"
- GET campaign with id
- DELETE campaign with id
- PATCH (i.e. update) campaign with id


### Users collection:
#### USER SCHEMA
//all users
- first_name: String (required)
- last_name: String (required)
- email: String (required)

//for users that will create a campaign
- occupation: String
- organization: String
- location: String
- social_media_url: String
- website_url: String
- organization_email: String
- about: String
  
#### "/api/users"
- GET all users
- POST a user

#### "/api/users/:id"
- GET user with id
- DELETE user with id
- PATCH user with id

#### "/api/users/:id/donations"
- GET all donations that have been made by user with id

#### "/api/users/:id/campaigns"
- GET all campaigns that have been created by user with id

### Donations collection:
#### DONATION SCHEMA
- campaign_id: String (required)
- user_id: String (required)
- amount_donated: Number (required)
- date_donated: Date

#### "/api/donations"
- GET all donations
- POST a donation

#### "api/donations/:id"
- GET donations with id


