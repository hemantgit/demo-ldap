The database migration from 5.5.0 to 5.5.1 involves running the following steps in the order mentioned.
If any migration step fails, contact Backbase support.
Please create a backup of the database, before running the Pre-migration steps.

Pre-migration steps to be run on the database server. Run these steps before the new Portal Web Application has been deployed! Please apply this per each content service database( resource-datasource, configuration-datasource,content-datasource ). $DB_NAME parameter is used as placeholder for your database name.
1. log into mysql via command line
2. mysql> use $DB_NAME;
3. mysql> \. <full/path/to/sql/script/>pre-dml-upgrade-5.5.0-to-5.5.1.sql
4. mysql> \. <full/path/to/sql/script/>upgrade-5.5.0-to-5.5.1.sql
If you need to rollback the migration install the database backup.

Migration steps. This should be done once.
1.Run migration tool jar on the application server

Post-migration steps to be run on the database server. Please apply this per each content service database( resource-datasource, configuration-datasource,content-datasource ). $DB_NAME parameter is used as placeholder for your database name.
1. get into mysql command line as root
2. use $DB_NAME;
3. mysql> \. <full/path/to/sql/script/>post-dml-upgrade-5.5.0-to-5.5.1.sql


