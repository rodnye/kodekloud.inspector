# Basic Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Security/Basic-Authentication)

---

## Table of Contents

- Basic Authentication
  - 1. Generate the Password File (.htpasswd)
  - 2. Configure Nginx to Require Authentication
  - 3. Next Steps & References
  - Watch Video
    - 1.1 Using Apache’s htpasswd
    - 1.2 Using OpenSSL

---

## Content

Nginx For Beginners

Security

# Basic Authentication

Nginx offers a straightforward way to secure parts of your website—such as admin panels, staging previews, or premium sections—using HTTP basic authentication. Only users with valid credentials can access protected resources, while the rest of your site remains publicly available.

![The image illustrates a concept of password protection with a computer screen, a lock icon, and text about authorization libraries and Nginx password protection.](https://kodekloud.com/kk-media/image/upload/v1752882439/notes-assets/images/Nginx-For-Beginners-Basic-Authentication/password-protection-nginx-authorization.jpg)

For example, anyone can browse the public pages of `kodekloud.com`, but visiting `kodekloud.com/admin` will trigger a browser login prompt:

![The image shows two login forms with URLs for "kodekloud.com," each featuring a name and password field, a checkbox, and a "Sign In" button. Both forms have a padlock icon, indicating security features.](https://kodekloud.com/kk-media/image/upload/v1752882441/notes-assets/images/Nginx-For-Beginners-Basic-Authentication/kodekloud-login-forms-security.jpg)

> [!important]
> **Warning**
>
> HTTP basic authentication sends credentials encoded in Base64, not encrypted. Use it only within trusted networks (VPN or internal LAN). For public-facing apps, consider OAuth, JWT, or framework-native authentication for better security and user experience.

---

## 1\. Generate the Password File (`.htpasswd`)

You can create the `.htpasswd` file with either Apache’s utility or OpenSSL. Store this file in a secure directory (e.g., `/etc/nginx/conf.d/`).

| Method            | Requirement                      | Usage Example           |
| ----------------- | -------------------------------- | ----------------------- |
| Apache `htpasswd` | `apache2-utils` or `httpd-tools` | Add users with a prompt |
| OpenSSL           | Built-in on most systems         | Manually append hashes  |

### 1.1 Using Apache’s `htpasswd`

```
# Install the tool if needed
sudo apt-get install apache2-utils   # Debian/Ubuntu
sudo yum install httpd-tools         # RHEL/CentOS


# Create a new file and add the first user
sudo htpasswd -c /etc/nginx/conf.d/.htpasswd admin
# Add additional users (omit -c to avoid overwriting)
sudo htpasswd /etc/nginx/conf.d/.htpasswd jsmith
# Enter and confirm password
```

### 1.2 Using OpenSSL

```
# For each user, append "username:" then an APR1-hashed password
sudo sh -c "echo -n 'admin:' >> /etc/nginx/conf.d/.htpasswd"
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/conf.d/.htpasswd"
sudo sh -c "echo -n 'jsmith:' >> /etc/nginx/conf.d/.htpasswd"
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/conf.d/.htpasswd"
# Enter and verify password
```

> [!important]
> **Note**
>
> Once hashed, plain-text passwords cannot be recovered. Store them securely using a password manager like LastPass or a secrets vault (e.g., HashiCorp Vault).

To confirm your `.htpasswd` entries:

```
cat /etc/nginx/conf.d/.htpasswd
# admin:$apr1$egX1fPMK$EXwGqVFsOSBFsQNJMc2iB0
# jsmith:$apr1$L5aCfsuk$XPsXgl1JMTQpd0ihTVyus.
```

---

## 2\. Configure Nginx to Require Authentication

Edit your server block (commonly in `/etc/nginx/sites-available/` or `/etc/nginx/conf.d/`) to protect a specific location, such as `/admin`:

```
server {
    listen 80;
    server_name example.com www.example.com;


    root /var/www/example.com/html;
    index index.html;


    location /admin {
        auth_basic           "Restricted Content";
        auth_basic_user_file /etc/nginx/conf.d/.htpasswd;
    }
}
```

- **auth_basic**: Text shown in the browser’s login dialog.
- **auth_basic_user_file**: Path to your `.htpasswd` file.

Save the file, test your configuration, and reload Nginx:

```
sudo nginx -t
sudo systemctl reload nginx
```

When you navigate to `http://example.com/admin`, a login popup appears:

![The image shows a web browser with a pop-up window titled "Authentication Required," prompting for a username and password. The browser is accessing a login page, and the text "Testing the Endpoint" is visible at the top.](https://kodekloud.com/kk-media/image/upload/v1752882442/notes-assets/images/Nginx-For-Beginners-Basic-Authentication/web-browser-authentication-popup-login.jpg)

---

## 3\. Next Steps & References

A live demo will follow, showcasing each step in action. In the meantime, explore these resources to deepen your understanding:

| Resource                      | Link                                                                   |
| ----------------------------- | ---------------------------------------------------------------------- |
| Nginx Official Documentation  | https://nginx.org/en/docs/http/ngx\\_http\\_auth\\_basic\\_module.html |
| Apache `htpasswd` Guide       | https://httpd.apache.org/docs/2.4/programs/htpasswd.html               |
| OpenSSL Password Hash Options | https://www.openssl.org/docs/man1.1.1/man1/openssl-passwd.html         |
| OAuth 2.0 Overview            | https://oauth.net/2/                                                   |

For further reading:

- [Securing Nginx with HTTPS](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [LastPass Password Manager](https://www.lastpass.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/3082fc69-784b-4bf2-b7d0-b19c7fb94952)**
>
> Watch video content
