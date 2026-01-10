# Athena Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Data-Analytics/Athena-Demo)

---

## Table of Contents

- Athena Demo
  - Uploading the CSV File and Configuring Amazon Athena
  - Setting Up the Athena Table
  - Querying the Data
  - Dropping the Table and Database
  - Conclusion
  - Watch Video
    - Clearing Existing Test Databases
    - Creating or Replacing a View
    - Creating an External Table for CSV Data
    - Reviewing Column Details
    - Sample SQL for Creating the External Table

---

## Content

AWS Certified Developer - Associate

Data Analytics

# Athena Demo

In this lesson, we demonstrate how to work with Amazon Athena using a sample CSV file containing dummy data. The CSV file simulates user or contact records with columns such as ID, first name, last name, email, secondary email, profession, date joined, and country code.

Below is an excerpt from the CSV file:

```
id,firstname,lastname,email,email2,profession,date joined,Country
100,Calla,Judyé,Calla.Judye@yopmail.com,Calla.Judye@gmail.com,developer,1943-10-17,UA
101,Letizia,Lanita,Letizia.Lanita@yopmail.com,Letizia.Lanita@gmail.com,firefighter,1995-02-08,AD
102,Jorry,Zuzana,Jorry.Zuzana@yopmail.com,Jorry.Zuzana@gmail.com,developer,2005-01-01,GY
103,Dorothy,Kannry,Dorothy.Kannry@yopmail.com,Dorothy.Kannry@gmail.com,doctor,1921-02-15,LR
104,Annora,Burkle,Annora.Burkle@yopmail.com,Annora.Burkle@gmail.com,firefighter,1912-08-26,PN
105,Alyssa,August,Alyssa.August@yopmail.com,Alyssa.August@gmail.com,worker,2014-06-20,ET
106,Fanchon,Grobe,Fanchon.Grobe@yopmail.com,Fanchon.Grobe@gmail.com,doctor,1902-09-17,UY
107,Atlanta,Daveta,Atlanta.Daveta@yopmail.com,Atlanta.Daveta@gmail.com,firefighter,2015-04-04,KE
108,Kalina,Durware,Kalina.Durware@yopmail.com,Kalina.Durware@gmail.com,firefighter,1944-12-13,IL
109,Meg,Henenbry,Meg.Henenbry@yopmail.com,Meg.Henenbry@gmail.com,developer,1909-01-13,GE
110,Raina,Earlie,Raina.Earlie@yopmail.com,Raina.Earlie@gmail.com,police officer,1991-08-23,KN
111,Marsiella,Noman,Marsiella.Noman@yopmail.com,Marsiella.Noman@gmail.com,police officer,1993-12-24,GU
112,Dode,Colbert,Dode.Colbert@yopmail.com,Dode.Colbert@gmail.com,police officer,2008-09-30,SG
113,Leona,Aida,Leona.Aida@yopmail.com,Leona.Aida@gmail.com,developer,1994-02-25,CL
114,Bertine,Stanwood,Bertine.Stanwood@yopmail.com,Bertine.Stanwood@gmail.com,doctor,2008-01-10,US
115,Pauilta,Gahl,Pauilta.Gahl@yopmail.com,Pauilta.Gahl@gmail.com,doctor,1932-12-14,HN
```

The CSV also contains additional test data:

```
1943-12-23,LU
```

And more sample rows:

```
2010-08-05,NA
9938,10036,Marnia,Guthrie,Marnia.Guthrie@yopmail.com,Marnia.Guthrie@gmail.com,developer,
9939,10037,Leona,Blisse,Leona.Blisse@yopmail.com,Leona.Blisse@gmail.com,firefighter,1901-01-14,TR
9940,10038,Jordan,Chabot,Jordan.Chabot@yopmail.com,Jordan.Chabot@gmail.com,firefighter,1906-09-29,CX
9941,10039,Lorie,Riordan,Lorie.Riordan@yopmail.com,Lorie.Riordan@gmail.com,developer,1901-06-23,TT
9942,10040,Calla,Catie,Calla.Catie@yopmail.com,Calla.Catie@gmail.com,firefighter,2013-04-18,PK
9943,10041,Annaliese,Hebner,Annaliese.Hebner@yopmail.com,Annaliese.Hebner@gmail.com,doctor,
2003-09-11,BN
9944,10042,Halette,Ciapas,Halette.Ciapas@yopmail.com,Halette.Ciapas@gmail.com,doctor,1901-12-16,AF
9945,10043,Ronna,Lorenz,Ronna.Lorenz@yopmail.com,Ronna.Lorenz@gmail.com,firefighter,1985-10-22,CK
9946,10044,Veda,Fancie,Veda.Fancie@yopmail.com,Veda.Fancie@gmail.com,police officer,1996-08-01,BT
9947,10045,Sashenka,Loeb,Sashenka.Loeb@yopmail.com,Sashenka.Loeb@gmail.com,doctor,2016-11-15,MG
9948,10046,Annaliese,Honoria,Annaliese.Honoria@yopmail.com,Annaliese.Honoria@gmail.com,doctor,1950-07-20,GR
9949,10047,Camile,Oster,Camile.Oster@yopmail.com,Camile.Oster@gmail.com,developer,1952-09-07,MV
9950,10048,Sharlene,Craggie,Sharlene.Craggie@yopmail.com,Sharlene.Craggie@gmail.com,worker,1994-08-12,VC
9951,10049,Neila,Devlen,Neila.Devlen@yopmail.com,Neila.Devlen@gmail.com,police officer,1991-06-29,BS
9952,10050,Melanie,Leifeste,Melanie.Leifeste@yopmail.com,Melanie.Leifeste@gmail.com,worker,
```

> [!important]
> **Note**
>
> Ensure that your CSV file is correctly formatted and stored in an S3 bucket before proceeding.

## Uploading the CSV File and Configuring Amazon Athena

Once the CSV file is uploaded to your S3 bucket, you can use Amazon Athena to directly query the data.

## Setting Up the Athena Table

After placing the CSV file in S3, open the Amazon Athena console. By default, you will see the default database. For this demonstration, you will create a new database and an external table to work with your CSV data.

### Clearing Existing Test Databases

If you have any pre-existing test databases, clear them using:

```
DROP DATABASE IF EXISTS test;
```

### Creating or Replacing a View

Before setting up the external table, you might need to create or replace a view. Here is an example:

```
CREATE OR REPLACE VIEW view_name AS
SELECT column1, column2
FROM table_name
WHERE condition;
```

### Creating an External Table for CSV Data

To create an external table that points to your CSV file in S3, follow these steps in the Athena console:

1.  Click on "Create Table" to specify a table from your S3 data source.
2.  Provide a table name (for instance, "users") and choose to create a new database (e.g., "athena_demo").
3.  Specify the S3 bucket location where your CSV file is stored.
4.  Select the table type corresponding to your file format (ensure the CSV option is selected).
5.  Set the field delimiter to a comma.
6.  Define the column details that match your CSV file. For example:
    - id: integer
    - firstname: string
    - lastname: string
    - email: string
    - email2: string
    - profession: string
    - date joined: date
    - Country: string

During this process, the AWS console interface will prompt you to configure the table and database details.

### Reviewing Column Details

Review the column details carefully using an excerpt similar to the following:

```
id,firstname,lastname,email,email2,profession,date joined,Country
100,Calla,Judye,Calla.Judye@yopmail.com,Calla.Judye@gmail.com,developer,1943-10-17,UA
101,Letizia,Lanita,Letizia.Lanita@yopmail.com,Letizia.Lanita@gmail.com,firefighter,1995-02-08
102,Jorry,Zuzana,Jorry.Zuzana@yopmail.com,Jorry.Zuzana@gmail.com,developer,2005-01-01,GY
103,Dorothy,Kannry,Dorothy.Kannry@yopmail.com,Dorothy.Kannry@gmail.com,doctor,1921-02-15,LR
104,Annora,Burkle,Annora.Burkle@yopmail.com,Annora.Burkle@gmail.com,firefighter,1912-08-26,PN
105,Alyssa,August,Alyssa.August@yopmail.com,Alyssa.August@gmail.com,worker,2014-06-20,ET
106,Fanchon,Grobe,Fanchon.Grobe@yopmail.com,Fanchon.Grobe@gmail.com,doctor,1902-09-17,UY
107,Atlanta,Daveta,Atlanta.Daveta@yopmail.com,Atlanta.Daveta@gmail.com,firefighter,2015-04-04,KE
108,Kalina,Durware,Kalina.Durware@yopmail.com,Kalina.Durware@gmail.com,firefighter,1944-12-13,IL
109,Meg,Henebery,Meg.Hene bry@yopmail.com,Meg.Henebry@gmail.com,developer,1909-01-13,GE
110,Raina,Earlie,Raina.Earlie@yopmail.com,Raina.Earlie@gmail.com,police officer,1991-08-23,KN
111,Marsietta,Noman,Marsietta.Noman@yopmail.com,Marsietta.Noman@gmail.com,police officer,1993-12-24,GU
112,Dode,Colbert,Dode.Colbert@yopmail.com,Dode.Colbert@gmail.com,police officer,2008-09-30,SG
113,Leona,Aida,Leona.Aida@yopmail.com,Leona.Aida@gmail.com,developer,1994-02-25,CL
114,Bertine,Stanwood,Bertine.Stanwood@yopmail.com,Bertine.Stanwood@gmail.com,doctor,2008-01-10,US
115,Pauilta,Gahl,Pauilta.Gahl@yopmail.com,Pauilta.Gahl@gmail.com,doctor,1932-12-14,HN
```

> [!important]
> **Note**
>
> Adjust the column types as necessary—for example, converting the ID to an integer and the date joined to a date type.

### Sample SQL for Creating the External Table

Once you have configured the table details, Athena will generate an SQL statement. An example statement might look like:

```
CREATE EXTERNAL TABLE IF NOT EXISTS athena_demo.`user` (
  id int,
  firstname string,
  lastname string,
  email string,
  email2 string,
  profession string,
  date date,
  country string
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
WITH SERDEPROPERTIES ('field.delim' = ',')
STORED AS INPUTFORMAT 'org.apache.hadoop.mapred.TextInputFormat'
OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
LOCATION 's3://athena-demo-kodeloud/'
TBLPROPERTIES ('classification' = 'csv');
```

After creating the table, you can query your data using standard SQL syntax.

## Querying the Data

To retrieve all records from your table, run:

```
SELECT * FROM user;
```

This query returns all rows from your CSV file. If you prefer to see a subset of entries, add the LIMIT clause:

```
SELECT * FROM user LIMIT 10;
```

You can also filter results. For example, to fetch records with the country code "US":

```
SELECT * FROM user WHERE country = 'US';
```

The Athena query editor displays the results with columns including ID, first name, last name, email, profession, and country.

## Dropping the Table and Database

If needed, you can remove the table or database using standard SQL commands:

- To drop the table:

  ```
  DROP TABLE user;
  ```

- To drop the database:

  ```
  DROP DATABASE athena_demo;
  ```

## Conclusion

This demonstration explained how to upload a CSV file to an S3 bucket, create an external table in Amazon Athena that references the CSV data, and execute SQL queries to retrieve and filter your data. For further details, refer to the [Amazon Athena documentation](https://docs.aws.amazon.com/athena).

![The image shows an Amazon Web Services (AWS) interface for creating a table from S3 bucket data using Amazon Athena. It includes fields for table details and database configuration.](https://kodekloud.com/kk-media/image/upload/v1752858604/notes-assets/images/AWS-Certified-Developer-Associate-Athena-Demo/aws-athena-s3-table-creation.jpg)

![The image shows a section of the AWS console where a user is defining column details for a table, including column names, types, and optional descriptions.](https://kodekloud.com/kk-media/image/upload/v1752858605/notes-assets/images/AWS-Certified-Developer-Associate-Athena-Demo/aws-console-table-column-details.jpg)

![The image shows a screenshot of an AWS Athena query editor displaying a table with user data, including columns for ID, first name, last name, email, profession, and country. The query results indicate 43 entries with various professions and email addresses.](https://kodekloud.com/kk-media/image/upload/v1752858606/notes-assets/images/AWS-Certified-Developer-Associate-Athena-Demo/aws-athena-query-user-data.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/ac3fe785-4e7a-4f57-ae16-99fcd3cfde7e/lesson/36081b27-725d-4551-8e8b-718553800434)**
>
> Watch video content
