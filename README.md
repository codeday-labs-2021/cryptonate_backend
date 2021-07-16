# cryptonate_backend

## Routes to access API:

### Campaigns collection:

#### "/api/campaigns"  
- GET all campaigns
- POST a campaign

#### "/api/campaigns/:id"
- GET campaign with id
- DELETE campaign with id
- PATCH (i.e. update) campaign with id


### Users collection:
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
#### "/api/donations"
- GET all donations
- POST a donation

#### "api/donations/:id"
- GET donations with id


