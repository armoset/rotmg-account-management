# rotmg-account-management

## Requirements
- Owning a Domain with a Catch All Email
- Having [Node](https://nodejs.org/en) installed

## Getting started
- rename ``.env.example`` to ``.env``
- set corresponding values in ``.env``

## Create Accounts
- navigate to the root folder
- execute ``npm run create {{numberOfAccounts}}``
- wait for the script to end
- verify all emails sent to your catch all email

## Get Daily Login Rewards (Not tested yet)
- navigate to the root folder
- execute ``npm run daily``

- you need to claim the dailies at the end of the month

## Additional Infos
- You can find the csv of all your accounts created at ``./src/logic/account-store/store.csv`` (username;email;password)
- Username, Password and Email are generated randomly for now


## Ongoing Development
- Daily Login (still in experimental)
- Preparing the code for different email strategies

## Ideas
- Support EAM / Muledump imports / exports
- SMTP-Integration to automatically verify accounts
- Supporting different email strategies