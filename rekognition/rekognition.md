## How to run recognition using your profile

### Create AWS Account (Free Tier)
- Create a free tier account on AWS, use Sydney as your region if asked
- Go to billing and set alarms: set the limit to $1 so that if you somehow go past the free tier limits you get notified.

### Create IAM role
- First create an IAM role with admin access  to prevent using your root account
- Click on your username on top right-hand corner
- Click on Get started with IAM users
- Give programmatic access to the user
- Create a new user group
  - Search and select the AdministratorAccess (or RekogntionFullAccess) policy and create the group
- Finish the remainder of the tests, on the last page make sure to download the .csv file (or save the access ID and the secret key somewhere safe)

### Run Rekognition on Nectar
- Log on to the nectar instance
- Move to the ```images_to_tag``` folder
- Make sure mongo is up and running
  - Run ```> lsof -I :27017``` to check if mongo is up
- Run the script
  - Pass in your folder name, access id and secret key as below
  - ```> python3 rekongition.py <Folder_name> <Access_id> <Secret_key> ```
  - Wait till all the images have been tagged

### Verify
- ```>mongo```
- ```>use recognition```
- ```>db.object_tags.count() -> shows the count```
- ```>db.object_tags.find() -> shows the collection```