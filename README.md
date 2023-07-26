# Meowio blogging engine

- Multitenancy blogging engine allows multiple tenants to use the same backend and deploy their own blog
- Tenant first sends request for creation to backend with credentials. Tenant is also given single owner user, that he can use to access his blog with management privileges. His user is not given a role, that would require column with same records for all users except one, but his ownership is checked by verifying same ceredentials for tenant and user on login request.

- To sign in as owner use these credentials

``` txt
username: smart@guy.dev
password: B3H_appy
```

- To sign in as user use these credentials

``` txt
username: not_that_smart@guy.dev
password: St4y_sad
```

- I found some differences between the figma design and the github assignment. It is possible that I just misunderstood the assignemnt. I try to be the smartest but sometimmes I fail. Whenever there was a difference I preferred to use the solution in swagger as a source of truth.
- This is the list of things I didn't understand, and I would be open to contemplating or discussing these things with someone:
  - There was email in login form in figma, but there is username in swagger
  - In one example is perex and in different one is content
  - Maybe it is just a design thing, but it was strange to me, that even though it is single user blog there was author specified in every article
  - There was __log in__ button on articles route in figma, but this route is protected in swagger, so I assumed that user can't view articles without signing in

## Project roadmap

1. Visualize project in whimsical
2. Visualize database structure
3. Init repo with [python script](https://github.com/TurniXXD/py-repo-init)
4. Setup monorepo with pnpm
5. Create basic routing with react router
6. Setup i18n
7. Create basic types with type orm
8. Connect to DB and synchronize
9. Create API routes
10. Setup authorization on server
11. Setup swagger
12. Setup client - server authorization
13. Image upload
14. Create article
15. Get all articles
