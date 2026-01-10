# Ansible Vault - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Ansible-Advanced-Course/Other-Topics/Ansible-Vault)

---

## Table of Contents

- Ansible Vault
  - Encrypting an Existing Inventory File
  - Running Playbooks with Encrypted Inventory
  - Alternative Approach: Storing the Vault Password in a File
  - Viewing and Creating Encrypted Files
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Ansible Advanced Course

Other Topics

# Ansible Vault

In this guide, we explain how to protect sensitive data in your Ansible projects by using Ansible Vault. Traditionally, plain-text credentials—such as passwords and API keys—have been stored in inventory files, posing a significant security risk. With Ansible Vault, you can encrypt this sensitive information, ensuring it remains secure and only accessible when the correct password is provided.

## Encrypting an Existing Inventory File

Let's assume you have an inventory file with the following content:

```
inventory
web1 ansible_host=172.20.1.100 ansible_ssh_pass=Passw0rd
web2 ansible_host=172.20.1.101 ansible_ssh_pass=Passw0rd
```

To encrypt this file, run:

```
ansible-vault encrypt inventory
```

Once executed, you will be prompted to enter a new vault password. After encryption, the file’s content is no longer human-readable without the correct password.

## Running Playbooks with Encrypted Inventory

If you attempt to run a playbook that references an encrypted inventory file without providing the vault password, Ansible will return an error. To execute the playbook successfully, include the `--ask-vault-pass` option so Ansible can prompt for the vault password, as shown below:

```
ansible-playbook playbook.yml -i inventory --ask-vault-pass
```

After entering the correct vault password, your playbook will run as expected.

> [!important]
> **Note**
>
> For improved security, avoid running playbooks without providing the vault password. Always use the `--ask-vault-pass` option or a secure method to supply the password.

## Alternative Approach: Storing the Vault Password in a File

An alternative method is to store the vault password in a file and reference it with your command. However, keep in mind that saving the vault password in plain text is not recommended. A more secure approach is to use a Python script (with a `.py` extension) that dynamically retrieves the vault password—possibly via an API call, a database, or another secure source.

> [!important]
> **Warning**
>
> Storing the vault password in plain text poses security risks. Always consider using a dynamic retrieval method to ensure your credentials remain secure.

## Viewing and Creating Encrypted Files

To inspect the contents of an encrypted file, use the following command:

```
ansible-vault view inventory
```

Similarly, to create a new encrypted file, run:

```
ansible-vault create new_file.yml
```

## Conclusion

By encrypting your inventory files and other sensitive data using Ansible Vault, you significantly enhance the security of your automation workflows. For further practice, try experimenting with these vault commands in your Ansible environment.

For more information on Ansible Vault and securing your infrastructure, consider exploring the [Ansible Documentation](https://docs.ansible.com/ansible/latest/user_guide/vault.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/5ce7e345-0c21-4fba-8735-a4d9f3302e0e/lesson/6fa9fcb9-2536-4737-ab2f-759752b9959d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/ansible-advanced-course/module/5ce7e345-0c21-4fba-8735-a4d9f3302e0e/lesson/00354234-d22c-4fb7-b546-f74b732cedeb)**
>
> Practice lab
