# File Based Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/File-Based-Storage/File-Based-Storage)

---

## Table of Contents

- File Based Storage
  - What Is File-Based Storage?
  - Kinds of File Data
  - Corporate File Types and Export Formats
  - Other Format: Avro
  - Storing File-Based Data in Azure
  - Links and References
  - Watch Video
    - CSV Example
    - JSON Example
    - XML Example

---

## Content

DP-900: Microsoft Azure Data Fundamentals

File Based Storage

# File Based Storage

In this lesson, we’ll explore how to store and manage file-based (object) data in Azure as part of the DP-900: Microsoft Azure Data Fundamentals certification.

## What Is File-Based Storage?

File-based storage—also known as object storage or unstructured data storage—treats entire files (images, documents, archives) as single objects. You upload, download, or access the complete file, not fragments.

![The image features a folder icon with a lock symbol and asterisks, suggesting secure storage, accompanied by the text "Access as one thing."](https://kodekloud.com/kk-media/image/upload/v1752872998/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/secure-storage-folder-icon-access.jpg)

Since each file object encapsulates all of its content—whether mixed media, text, or binary—Azure handles it as an opaque unit. You won’t retrieve half an image or half a Word document.

![The image shows a document labeled "Whole object" above an open briefcase, with the text "What Are We Storing?"](https://kodekloud.com/kk-media/image/upload/v1752872999/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/whole-object-briefcase-storage-document.jpg)

Microsoft terms this **unstructured data** because a single file can contain any type of content.

![The image features the text "What Are We Storing?" and an icon of a briefcase with the label "Object storage."](https://kodekloud.com/kk-media/image/upload/v1752873000/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/what-are-we-storing-object-storage.jpg)

For example, an audio file might combine voice, music, and sound effects into one file object.

![The image is a presentation slide titled "What Are We Storing?" featuring an icon of an audio file with symbols of a microphone, a person speaking, a music note, and sound waves, labeled as "Unstructured data."](https://kodekloud.com/kk-media/image/upload/v1752873001/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/what-are-we-storing-unstructured-data.jpg)

Or a Word document could include emails, images, and text—yet you handle it as a single upload or download operation.

![The image is a diagram showing a document with email addresses and a short story, labeled as "unstructured data," under the heading "What Are We Storing?"](https://kodekloud.com/kk-media/image/upload/v1752873002/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/unstructured-data-document-email-diagram.jpg)

> [!important]
> **Note**
>
> Whether you refer to it as object storage or unstructured data, the key concept is that the file is managed as a single object.

![The image is a diagram showing the concept of storing a "whole file," which is uploaded and downloaded as a single object.](https://kodekloud.com/kk-media/image/upload/v1752873003/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/whole-file-storage-diagram.jpg)

## Kinds of File Data

Although all files are stored as binary data in Azure, we categorize them by structure:

| Category   | Description                                | Common Extensions               |
| ---------- | ------------------------------------------ | ------------------------------- |
| Text-based | Editable with any text editor              | `.csv`, `.json`, `.xml`, `.txt` |
| Binary     | Requires specialized software to interpret | `.pdf`, `.jpeg`, `.png`, `.exe` |

![The image shows two overlapping documents with binary numbers on them, labeled "Binary data," under the heading "Kinds of Data."](https://kodekloud.com/kk-media/image/upload/v1752873004/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/binary-data-overlapping-documents.jpg)

Popular text-based formats use delimiters or tags:

- CSV (comma-separated values)
- JSON (JavaScript Object Notation)
- XML (eXtensible Markup Language)

![The image illustrates different kinds of data formats, including a text editor (Notepad) and delimited text-based files such as CSV, JSON, and XML.](https://kodekloud.com/kk-media/image/upload/v1752873005/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/data-formats-text-editor-csv-json-xml.jpg)

## Corporate File Types and Export Formats

Our global organization maintains a variety of file assets:

- **PDF** catalogs for product listings
- **Word** documents with specifications
- **Image** files (PNG, GIF, JPEG)

When sharing data externally, we select formats that recipients can readily consume.

![The image shows icons representing different file types: PDF, Images, CSV, JSON, and XML, labeled under "Our Company's Files" and "Export."](https://kodekloud.com/kk-media/image/upload/v1752873006/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/company-files-export-file-types-icons.jpg)

Below are detailed examples of three common export formats.

### CSV Example

CSV files use rows ending with CRLF (`\r\n`) and commas to separate fields:

```
First Name,Last Name,City,Province,Country
Peter,Vogel,London,Ontario,Canada
Jason,van de Velde,Toronto,Canada,Registered
```

- The first row often contains column headers.
- Each subsequent row represents a record.

### JSON Example

JSON uses arrays (`[ ]`) and objects (`{ }`) with key-value pairs for nested structures:

```
[
  {
    "person": {
      "First Name": "Peter",
      "Last Name": "Vogel",
      "Address": {
        "City": "London",
        "Country": "Canada"
      }
    }
  },
  {
    "person": {
      "First Name": "Peter",
      "Middle Name": "Hunter",
      "Last Name": "Vogel"
    }
  }
]
```

- Flexible schema; fields can vary between records.

### XML Example

XML employs tags to define elements and hierarchy:

```
<Person>
  <FirstName>Peter</FirstName>
  <LastName>Vogel</LastName>
  <Address>
    <City>London</City>
    <Country>Canada</Country>
  </Address>
</Person>
<Person>
  <FirstName>Peter</FirstName>
  <LastName>Vogel</LastName>
  <!-- Additional elements can go here -->
</Person>
```

- Ideal for document-centric and hierarchical data.

## Other Format: Avro

Avro files combine a JSON schema header with a binary payload:

![The image describes the Avro data format, highlighting that it consists mostly of binary data and begins with a JSON header that describes the structure of the binary data.](https://kodekloud.com/kk-media/image/upload/v1752873007/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-File-Based-Storage/avro-data-format-binary-json-header.jpg)

This hybrid approach is optimized for big data systems like Hadoop.

## Storing File-Based Data in Azure

Azure Storage Accounts host file-based objects in Blob Storage. You can:

- Upload/download entire files via REST API, SDK, or CLI
- Configure access tiers (Hot, Cool, Archive)
- Secure with Azure RBAC and SAS tokens

> [!important]
> **Warning**
>
> Azure Blob Storage does not enforce any schema on your files. Always validate and parse unstructured data at the application level.

## Links and References

- [Azure Blob Storage Documentation](https://docs.microsoft.com/azure/storage/blobs/)
- [DP-900: Microsoft Azure Data Fundamentals](https://docs.microsoft.com/learn/certifications/exams/dp-900)
- [Introduction to Object Storage](https://azure.microsoft.com/services/storage/blobs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/e229086c-adc3-444d-a6da-f77b41067675/lesson/6e74b392-67ca-40c9-87d8-25ff2805d0b0)**
>
> Watch video content
