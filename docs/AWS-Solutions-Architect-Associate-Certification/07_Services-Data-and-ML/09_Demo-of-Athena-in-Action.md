# Demo of Athena in Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Demo-of-Athena-in-Action)

---

## Table of Contents

- Demo of Athena in Action
  - Uploading the CSV to S3 and Configuring Athena
  - Querying Data with Amazon Athena
  - Cleaning Up Resources
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Demo of Athena in Action

In this guide, we demonstrate how to leverage Amazon Athena to query CSV data containing sample user information. The CSV file, which holds roughly 10,000 entries, includes dummy records for users (or contacts) with attributes such as ID, first name, last name, primary and secondary email addresses, profession, join date, and country.

Below is a snippet from the CSV file:

```
id,firstname,lastname,email,email2,profession,date joined,Country
100,Calla,Judy,Calla.Judye@yopmail.com,Calla.Judye@gmail.com,developer,1943-10-17,UA
101,Letizia,Lanita,Letizia.Lanita@yopmail.com,Letizia.Lanita@gmail.com,firefighter,1995-02-08,AD
102,Jorry,Zuzana,Jorry.Zuzana@yopmail.com,Jorry.Zuzana@gmail.com,developer,2005-01-01,GY
103,Dorothy,Kannry,Dorothy.Kannry@yopmail.com,Dorothy.Kannry@gmail.com,doctor,1921-02-15,LR
104,Annora,Burkle,Annora.Burklee@yopmail.com,Annora.Burklee@gmail.com,firefighter,1912-08-26,PN
105,Alyssa,August,Alyssa.August@yopmail.com,Alyssa.August@gmail.com,worker,2014-06-20,ET
106,Fanchon,Grobe,Fanchon.Grobe@yopmail.com,Fanchon.Grobe@gmail.com,doctor,1902-09-17,UY
107,Atlanta,Daveta,Atlanta.Daveta@yopmail.com,Atlanta.Daveta@gmail.com,firefighter,2015-04-04,KE
108,Kalina,Durware,Kalina.Durware@yopmail.com,Kalina.Durware@gmail.com,firefighter,1944-12-13,IL
109,Meg,Henegry,Meg.Henegry@yopmail.com,Meg.Henegry@gmail.com,developer,1909-01-13,GE
110,Raina,Earlie,Raina.Earlie@yopmail.com,Raina.Earlie@gmail.com,police officer,1991-08-23,KN
111,Marsiella,Noman,Marsiella.Noman@yopmail.com,Marsiella.Noman@gmail.com,police officer,1993-12-24,GU
112,Dode,Colbert,Dode.Colbert@yopmail.com,Dode.Colbert@gmail.com,police officer,2008-09-30,SG
113,Leona,Aida,Leona.Aida@yopmail.com,Leona.Aida@gmail.com,developer,1994-02-25,CL
114,Bertine,Stanwood,Bertine.Stanwood@yopmail.com,Bertine.Stanwood@gmail.com,doctor,2008-01-10,US
115,Paulita,Gahl,Paulita.Gahl@yopmail.com,Paulita.Gahl@gmail.com,doctor,1932-12-14,HN
```

> [!important]
> **Overview**
>
> This demonstration involves uploading the CSV file to an S3 bucket and then querying the data using Amazon Athena. All steps—from uploading data to executing SQL queries—are covered in this guide.

## Uploading the CSV to S3 and Configuring Athena

Once you have uploaded your CSV file to an S3 bucket, the next step is to set up Amazon Athena to query the data. Follow these steps:

1.  Navigate to the [Amazon Athena Console](https://console.aws.amazon.com/athena/).
2.  Clean up any default databases or test queries by removing unnecessary test databases. For example, you can drop a pre-existing test database using:

    ```
    DROP DATABASE test;
    ```

3.  Click on "Create Table" and follow the on-screen prompts to define a new table linked to your CSV data. During the set-up, you need to provide:
    - **Table name** and **database name** (either an existing one or a new one).
    - **S3 location** of your CSV file.
    - **File format**, which in this case is CSV.

4.  Specify the details of the CSV such as the field delimiter (a comma) and configure each column's data type. For example, map the ID to an integer type, text fields such as first name, last name, and emails to string types, and the join date to a date type.

The following image shows the AWS Athena console, where you configure the table details and database settings:

![The image shows an AWS Athena console screen where a user is configuring table details and database settings, including naming a table and selecting or creating a database.](https://kodekloud.com/kk-media/image/upload/v1752865042/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-of-Athena-in-Action/aws-athena-console-table-configuration.jpg)

Upon completing the form, Athena will generate a SQL statement similar to the one below to create an external table:

```
CREATE EXTERNAL TABLE IF NOT EXISTS `athena_demo`.`user` (
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
LOCATION 's3://athena-demo-kodekloud/'
TBLPROPERTIES ('classification' = 'csv');
```

This query creates an external table that maps directly to your CSV data on S3, making it possible to run SQL queries on the data.

## Querying Data with Amazon Athena

To execute queries on your newly created table, follow these guidelines:

1.  Open a new query tab in the Athena console.
2.  To retrieve all the records from the table, use the following SQL statement:

    ```
    SELECT * FROM user;
    ```

    This query will return over 10,000 results corresponding to all the CSV entries.

3.  To limit output for testing purposes, use the SQL LIMIT clause:

    ```
    SELECT * FROM user
    LIMIT 10;
    ```

    This query returns only 10 rows, providing a quick preview of your data.

4.  To filter data (for example, to display only users from the United States), run:

    ```
    SELECT * FROM user
    WHERE country = 'US';
    ```

The image below shows the AWS Athena query editor with the results displayed in a tabular format, featuring columns such as ID, first name, last name, email, profession, and country:

![The image shows an AWS Athena query editor interface displaying a table with user data, including columns for ID, first name, last name, email, profession, and country. The query results are shown in a tabular format with multiple entries.](https://kodekloud.com/kk-media/image/upload/v1752865043/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-of-Athena-in-Action/aws-athena-query-editor-user-data.jpg)

## Cleaning Up Resources

After you've completed your queries, it's a good practice to clean up your Athena environment by removing any tables or databases you no longer need.

To delete the table, execute:

```
DROP TABLE user;
```

Then, to drop the database, use:

```
DROP DATABASE athena_demo;
```

> [!important]
> **Cleanup Reminder**
>
> Cleaning up your resources helps prevent unnecessary charges and keeps your AWS environment organized.

## Conclusion

This guide has demonstrated how to upload a CSV file to an S3 bucket and query it using Amazon Athena with standard SQL commands. By mapping an external table to your S3-based CSV file, Athena enables you to easily analyze large datasets. Enjoy using Amazon Athena for your data querying needs, and happy querying!

For additional resources, consider exploring:

- [Amazon Athena Documentation](https://docs.aws.amazon.com/athena)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/e65d42c2-31ef-4abd-b8c9-e6dde6107bf7)**
>
> Watch video content
