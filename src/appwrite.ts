import {Client, Account} from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('665cdeb50027cdbdd34f');

const account = new Account(client);

export {client, account};