Hi! It’s been two years of development of HandsOnMoney, the companion app I needed to carry a GnuCash book in my pocket. Since then, I have come to know many people and their setups. And boy, they are different (I mean, people are different, their setups are different too). In this article, I cover common mistakes and pitfalls of accessing a shared GnuCash book using multiple computers and companion apps on Android and iOS.

The basics

But first, let’s set the stage and expectations.

Unlike cloud-based solutions, GnuCash is a single-user system. Practically, it means that only a single user can access a book at a time.

You own your data. It’s a blessing and a curse. On one side, your data is visible only to you, on the other side, you carry the responsibility of handling data corruption, conflicts, and simultaneous access.

GnuCash can store data in multiple ways.

* XML - in a text format (it’s compressed, though, so not readable out of the box)
* SQLite3 - a database in a file
* Hosted database - a database on a computer network or even on the Internet

Who are “the users”

The users can be real people needing access to a shared GnuCash book. Or it can be  you accessing your file from multiple devices.

An important thing here is that GnuCash is inherently a desktop software. However, there are enthusiasts (including yours truly) who develop companion software to access the book from mobile platforms.

Thus said, let’s talk about the ways you can share your book among several devices.

Expectations

If you are  a new GnuCash user coming from a cloud-based solution, you are likely used to software that does a lot of things seamlessly.

However, GnuCash comes at the cost of:

* Different instances of GnuCash have different data, and you are responsible for merging them semi-automatically
* The users/devices take turns accessing the software.
* Supporting your devices to run the same version of GnuCash.

Problem in a nutshell

You have a single file (or a database) and software that actively prevents simultaneous access to that file.

Independent of our conversation, try to step back and think about how you would share access to a text document among several devices.

Ratings

Each solution has its rating on different dimensions.

Column 1	Column 2
Safety	How safe can I feel about my data getting corrupted?
Automation	How much automatic tooling is available vs. how much manual labor it will require to support.
Multi-user	How well does this solution work with multiple users.
Real-time	How soon do I see data entered in other devices?
Privacy & security	How much information do other companies see and how much it’s prone for security breaches.


The paranoid way - safest yet most painful

Column 1	Column 2
Safety	⭐️⭐️⭐️⭐️⭐️
Automation	⭐️
Multi-user	⭐️⭐️⭐️⭐️⭐️
Real-time	⭐️
Privacy & security	⭐️⭐️⭐️⭐️⭐️


Workflow

1. Make a copy of your book on each device.
2. Work on your books however you want (in parallel, offline, etc.)
3. When ready, merge the books.
4. Distribute the “master” book among devices.

Merging the books

Good thing - you don’t have to manually merge books, transaction-by-transaction. GnuCash gives you a specific format to export and import data while taking care of duplicates.

1. Choose one book as “master”. For other books export transactions using File -> Export -> Export Transactions as CSV…
2. Open your “master” book.
3. For every CSV file you have, go to File -> Import -> Import Transactions from CSV … Do not forget to select “GnuCash Export Format” – this turns on a native GnuCash mechanism to work with splits.
4. Work out any conflicts should they pop up on the last import screen.

The Great File in the Cloud - just a file in a Dropbox

Column 1	Column 2
Safety	⭐️
Automation	⭐️⭐️⭐️⭐️⭐️
Multi-user	⭐️
Real-time	⭐️⭐️⭐️⭐️⭐️
Privacy & security	depends
	


It’s 2026, Dropbox is 17 years old. A good age to give it a small job to do before it leaves the house, before graduation. Of course, there are so many providers, platforms, and tools that you can use - iCloud, Google Drive, Syncthing.

One liability that comes with a file in the Cloud is a potential file conflict. There is absolutely no magic behind any Cloud - each device has its own copy of the GnuCash file. If accessed simultaneously, you will have two copies. To add insult to injury, some cloud providers make things obscure so you may not see the issue when it occured by rather see it so late in the game that it will mean a manual reconciliation of transactions. And last but not least, technical glitches (Cloud process crash, GnuCash crash) happen, and it is totally possible to end up with a corrupted book. Glitches are not unique to this synchronization way, but amplified by a human factor and the frequency of synchronizations.

Workflow

1. Put your file in a Cloud - Dropbox, iCloud, Google Drive, etc.
2. Instruct users to never ever access the file simultaneously. If you are the only user, stop being sloppy and forgetting to close GnuCash before closing the lid of your laptop.
3. Always wait for the cloud provider to synchronize files. If Cloud allows forcing a sync, always use it before opening a GnuCash book.
4. Be proactive about backups. Do not expect GnuCash mechanisms to save you - you are using an extra piece of software that GnuCash does not know about.

Privacy & security

There is no rating because your privacy and security depend on your choices. Choose a provider that gives away your information without any questions, and you effectively have no privacy. Choose an offline tool like rsync or Syncthing - and you can disconnect from the Internet. As usual, the more privacy and security you want, the more friction you have.

Look ma I’m a DBA! Hosting data in the database

Column 1	Column 2
Safety	⭐️⭐️⭐️
Automation	⭐️⭐️⭐️⭐️⭐️
Multi-user	⭐️
Real-time	⭐️⭐️⭐️⭐️⭐️
Privacy & security	depends
	
	


If you are handy enough and can host a Postgres/MySQL database. This is likely the best option for you.

Instead of storing the book in a file, prone to corruption, you can store it in the database. As usual, there are a few tradeoffs - you have to install additional software (Postgres or MySQL), set up the server, connections, and manage security and privacy yourself.

The workflow is pretty much like the previous, with a small exception. The internal GnuCash lock mechanism works much better. Still, GnuCash maintainers are explicitly stating that the lock mechanism is a weak protection:

Locking table, should have zero or one record. Provides weak protection against simultaneous access.
https://wiki.gnucash.org/wiki/SQL#Gnclock

Also, privacy and security depend on you. Open your database to the world with a default password - and just wait for someone to delete all the tables. Or air-seal it in a local network without Internet access - and enjoy peace.

Companion apps

Full disclosure: you are reading this article on the HandsOnMoney website. So assume I’m heavily biased and check things for yourself.

There is no official GnuCash app for Android or iOS.

However, there are decent alternatives that you can use as your companion app. You can find more here https://wiki.gnucash.org/wiki/GnuCash_and_Mobile_Devices

All of the apps support only two ways:

* CSV sync
* Automatic sync via SQLite3 or XML file

It’s virtually our first two solutions. So you can confidently use the first two workflows when using the companion app. However, you shall read the disclaimer from GnuCash carefully:

GnuCash itself is not available on mobile platforms, but there are some independently-developed mobile apps that can work with GnuCash. Few write directly to your file and those that do support only the SQLite3 backend. They don’t use the GnuCash engine, generating their own SQL queries instead. That runs the risk that they’ll get something wrong or that we’ll change the SQL Schema in some way that breaks their implementation, so users are advised to test thoroughly on a scratch file before using them with production data and monitoring them carefully.

So while the workflow stays the same, there is one more risk to consider - data corruption by the companion app itself.

The reason here is simple: GnuCash does not provide any official library to work with data files. So every implementation that works with the file directly may not know something and unintentionally corrupt the GnuCash book.

But since there is already a Cloud at play and you are likely backing up your data often (don’t you?), you should be good enough to restore from any potential disaster.

How things work in HandsOnMoney

HandsOnMoney supports both ways - CSV sync and automatic sync using sqlite3 data format.

CSV export uses native GnuCash export format thus the first workflow works as described.

Automatic sync is prone to all the troubles described above (things depend on the Cloud provider you choose, if you are closing GnuCash). However, one thing is positively a bit different - you can have GnuCash and HandsOnMoney open on several devices and still be able to sync automatically.

Under the hood, there are two files - the one that HandsOnMoney works with and the one in the Cloud. When you are ready, you can sync the data. At that moment, HandsOnMoney will:

1. Nag you to close GnuCash and wait for the Cloud to sync
2. Check if GnuCash is open (it's a naive check, but still worth it)
3. Sync accounts, transactions, commodities, and prices