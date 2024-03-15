

**Node.js + Express** application.


# Usage

pm2 start src/index.js


# Link to Web-Application

https://hyte-janne.northeurope.cloudapp.azure.com/home.html


# Link to API Documentation

https://hyte-janne.northeurope.cloudapp.azure.com/docs/

# Database Structure
![image](https://github.com/janne02/server_be_hyte/assets/35040807/9094d777-f561-4d1d-8dc5-57fa81cdab36)


# Get all users (token required)
Regular user can only get his own data but admin can get everyones data

GET /api/users

![image](https://github.com/janne02/server_be_hyte/assets/35040807/55cab403-d8b0-4e45-98ac-40f1a8287fb6)

# Get user dialog (token required)
GET /api/users/:id

Regular user can read his own data from dialog page that is visible after pressing info button. Admin can view everyones dialog.
![image](https://github.com/janne02/server_be_hyte/assets/35040807/755f1c48-2a83-4a1a-a837-846135294b41)
![image](https://github.com/janne02/server_be_hyte/assets/35040807/0056a99c-9b16-45e0-b40d-a618eb1b7e36)

# Delete user dialog (token required)
DELETE /api/users/:id

Regular user can delete their own account, admin user can delete any account.
admin/user must delete diaryentries first
![image](https://github.com/janne02/server_be_hyte/assets/35040807/6c87e200-38cb-4b63-a0c8-ca6b71ed2386)

# Create new user (register)
POST /api/users
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

![image](https://github.com/janne02/server_be_hyte/assets/35040807/14509a06-00ec-4ad9-a813-8639890d1445)

# Login
POST /api/users/login
content-type: application/json
{
  "username": "user",
  "password": "secret"
}
![image](https://github.com/janne02/server_be_hyte/assets/35040807/540776a6-b7c6-4bf4-81a0-cc4abeefd6bb)

# Update existing userdata (token required)
Updates are visible after user presses getusers button
PUT /api/users/
Authorization: Bearer <token>
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}
![image](https://github.com/janne02/server_be_hyte/assets/35040807/a773eb9d-5a30-4c10-bc62-c3f9bdd540be)

# Logout
Application has logout button which clears localStorage and changes page to register/login

# Dark mode
Application has button for darkmode on ul
![image](https://github.com/janne02/server_be_hyte/assets/35040807/bb11da76-ebec-4616-a59a-b0781d2965cc)
![image](https://github.com/janne02/server_be_hyte/assets/35040807/32f941ad-24b7-4784-95af-f843301e4a31)

# Get all entries (token required)
Regular user can only get his own entries but admin can get everyones entries
GET /api/auth/entries

GET /api/entries/:id
![image](https://github.com/janne02/server_be_hyte/assets/35040807/65e3bf02-087f-416b-bd6c-98c372072e30)

# Post entry (token required)
Adds entry to user
POST /api/entries content-type: application/json
{ "entry_date": "2024-02-12", "mood": "Happy", "weight": 69.6, "sleep_hours": 7, "notes": "This was a good day" }
![image](https://github.com/janne02/server_be_hyte/assets/35040807/6ed81fae-7b0a-4ea4-82c5-d30de55f58e8)

# Delete entry (token required)
Regular user can delete their own entries and admin can any users entries.
DELETE /api/entries/:id
![image](https://github.com/janne02/server_be_hyte/assets/35040807/1aa2e43f-f6b6-4f91-9032-4091b31b8af8)

# Known bugs / issues
I couldnt get it working that when user deletes their own account it doesnt logout and you need to manually press logout button to finalize user deletion

# Contributors
Course teachers: Matti Peltoniemi and Ulla Sederlöf at Metropolia UAS.
