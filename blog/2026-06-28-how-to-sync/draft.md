Hi! It's beign a two years of development and of HandsOnMoney, the companion app I needed to carry a GnuCash book in my pocket. Since then I came to know many people and their setup. And boy they are different (I mean both, people are different, their setups are different too). In this article I cover common mistakes and pitfals of accessing a shared GnuCash book using multiple computers, companion apps on android and iOS.

# The basics

But first let's set the basics.

Unlike cloud-based solutions GnuCash is a single-user system. Practically it means that only a single user can access data at a time.

You own your data. And it's a blessing and curse. On one side - your data is visible only to you, on another side - you carry a responsibility of handling data corruption, conflicts, ans simultaneous access.

GnuCash can store data in multiple ways
* XML - in a text format (it's compressed though  - so not readable out-of-the box)
* SQLite3 - a database in a file
* Hosted database - a database on a computer network or even on the Internet

# Who are "the users"

The users can be real people needing access to a shared GnuCash book. Or it can be  you accessing your file from multiple devices.

Important thing here is GnuCash is inherently a desktop software. However there are enthusiasts (your truly) who develop companion software to access the book from mobile platforms.

Thus said let's talk the ways you can share your book among several devices.

# Setting expectations

If you are  a new GnuCash user coming from a cloud-based solutions - you likely used to a software that does a lot of things seamlessly.

However GnuCash comes at the cost of:
* different instances of GnuCash having different data and your are responsible to merge it semiautomatically
* the users/devices take turns accessing the software

Also, make sure all your devices run the same version of GnuCash.
# Problem in a nutshell

You have a single file (or a db) and a software that actively prevents simultaneous access to that file.

Independently of our conversation - try to step back and think how would you share the access to text document amount several devices?

# Ratings

Each solution has it's rating on different dimensions

| Safety             | How safe can I feel about my data getting corrupted?                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Automation         | How much automatic tooling is availabe vs. how much manual labor it will require to support. |
| Multi-user         | How well does this solution works with multuple users.                                       |
| Real-time          | How soon do I see data entered in other devices?                                             |
| Privacy & security | How much information do other companies see and how much it's prone for security breaches.   |
# The paranoid way - safest yet most painful

| Safety             | ⭐️⭐️⭐️⭐️⭐️ |
| ------------------ | ---------- |
| Automation         | ⭐️         |
| Multi-user         | ⭐️⭐️⭐️⭐️⭐️ |
| Real-time          | ⭐️         |
| Privacy & security | ⭐️⭐️⭐️⭐️⭐️ |

## Workflow
1. Make a copy your book on each device
2. Work on your books however you want (in parallel, offline, etc.)
3. When ready - merge the books
4. Distribute the "master" book among devices

## Merging the books

Good thing - the you don't have to manually merge books, transaction-by-transaction. GnuCash gives you a GnuCash-specific format to export an import data while taking care of duplicates.

1. Choose one book as "master". For other books export transactions using File -> Export -> Export Transactions as CSV...
2. Open you "master" book.
3. For every CSV file you have go to File -> Import -> Import Transactions from CSV ... Do not forget select "GnuCash Export Format" -- this turns on a native GnuCash mechanism to work with splits. 
4. Work out any conflicts should they pop on the last import screen.

# The Great File in the Cloud - just a file in a dropbox

| Safety             | ⭐️         |
| ------------------ | ---------- |
| Automation         | ⭐️⭐️⭐️⭐️⭐️ |
| Multi-user         | ⭐️         |
| Real-time          | ⭐️⭐️⭐️⭐️⭐️ |
| Privacy & security | depends    |
It's 2026 DropBox is 17 years old. A good age to give it a small job to do before it leaves the house before graduation. Of course there are so many providers, platforms and tools that you can use - iCloud, Google Drive, Syncthing.

One liability that comes with a file in the Cloud - is a potential file conflict. There is absolutely no magic behind the any Cloud - each device has it's own copy of the GnuCash file. If accessed simultaneously - you will have two copies To add insult to injury - some cloud providers make it obscure so you may not see the issue when it occured by rather see it so late in the game that it will mean a manual reconciliation of transactions. And last but not least, technical glitches (Cloud process crash, GnuCash crash) happen and it totally possible to end up with a corrupted book. Glitches are not unique to this synchronization way, but amplified by a human factor and frequency of synchronizations.

## Workflow
1. Put you file in a Cloud - DropBox, iCloud, Google Drive, etc.
2. Instruct users to never-ever access the file simulateneonsly. If you are the only user - stop being sloppy and forgetting to close GnuCash before closing the lid of your laptop.
3. Always wait for the cloud provider to synchronize files. If Cloud allows a forcing a sync - always use it before opening a GnuCash book.
4. Be proactive about backups. Do no expect GnuCash mechanisms to save you - you are using an extra piece of software GnuCash does not know about.

## Privacy & security

There is no rating because your privacy and security depends on your choices. Choose a provider that gives away your information without questions - and you effectively have no privacy. Choose an offline tools like rsync or Syncthing - and you can disconnect from the Internet. As usual more privacy and security you want - more friction you have.

# Look ma I'm a DBA! Hosting data in the database

| Safety             | ⭐️⭐️⭐️     |
| ------------------ | ---------- |
| Automation         | ⭐️⭐️⭐️⭐️⭐️ |
| Multi-user         | ⭐️         |
| Real-time          | ⭐️⭐️⭐️⭐️⭐️ |
| Privacy & security | depends    |
If you are handy enough and can host Postgres/MySQL database. This is likely a best option for you.
Instead of storing the data in the file, prone to corruption you can store it in the the database. As usual there a few tradeoffs - you have to install an additional software (Postgre or MySQL), set up the server, connections and manage security and privacy yourself.

The workflow is pretty much like previous with a small exception. Internal GnuCash lock mechanism works much better. Still GnuCash maintainers is explicitly sytating that the lock mechanism is a weak protection:

> Locking table, should have zero or one record. Provides weak protection against simultaneous access.
https://wiki.gnucash.org/wiki/SQL#Gnclock

Also privacy and security is absolutely depende on you. Open your datatbase to the world with default password - and just wait for someone to delete all the tables. Or air-seal it in a local network without Internet access - and enjoy piece.

# Companion apps

Full disclosure: you are reading this article on the HandsOnMoney website. So assume I'm heavily biased and check things for yourself.

There is no official GnuCash app for Android or iOS.

However there are decent alternatives that you can use as your companion app. You can find more here https://wiki.gnucash.org/wiki/GnuCash_and_Mobile_Devices

All of the apps fall into two categories:

- CSV sync
- Automatic sync via Sqlite3 or XML file

It's virtually our two first two solutions. So you can confidently use first two workflows when using the companion app. However you shall read the disclaimer from GnuCash carefully:

> GnuCash itself is not available on mobile platforms, but there are some independently-developed mobile apps that can work with GnuCash. Few write directly to your file and those that do support only the SQLite3 backend. They don't use the GnuCash engine, generating their own SQL queries instead. That runs the risk that they'll get something wrong or that we'll change the SQL Schema in some way that breaks their implementation, so users are advised to test thoroughly on a scratch file before using them with production data and monitoring them carefully.

So while the workflow stays the same, there is one more risk to consider - data corrption by the companion app itself.

The reason here is simple - GnuCash does not provide any official library to work with data files. So every implementation that works with the file directly may not know something and unintentionally corrupt the gnucash file.

But since there is a Cloud at play and you likely backing up your data often (don't you?) you should be good enough to restore from any potential disaster.

# How things work in HandsOnMoney

HandsONMoney supports both ways - CSV sync and automatic sync using sqlite3 data format.

CSV export uses native GnuCash export format thus the first workflow works as described.

Automatic sync, is prone to all the troubles described above (things depend on a Cloud provider you choose, you closing GnuCash). However one thing is positively a bit different - you can have GnuCash and HandsOnMoney open on several devices and still be able to sync automatically.

Under the hood there are two files - the one that HandsONMoney works with and the one in the Cloud. When you are ready, you can sync the data. At that moment HandsOnMoney will:
1. Nag you to close the GnuCash and wait for Cloud to sync
2. Check if GnuCash is open (it a naive check but still worth it)
3. Sync accounts, transactions, commodities and prices