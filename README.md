# SnapGram

---

## How to start this project

```
git clone <repo>
cd repo
npm i
npm run dev
```

## About

```
Snapgram is a social media post sharing website where user can upload their post with images,caption,tags,location.

User can like post, save post, delete post.

Explore page with infinite scroll.
```

## APPWRITE CRUD OPERATIONS

```
🟢FOR CREATING A DOCUMENT
const newDocument = appwrite.createDocument(
    //Here you have to provide 4 things
    <DATABASE_ID || DATABASE>,
    <COLLECTION_ID || SCHEMA>,
    <UNIQUE_ID_FOR_YOUR_DOCUMENT>,
    <DOCUMENT_DATA>
)
```

```
🟡FOR GETTING A DOCUMENT
const newDocument = appwrite.listDocuments(
    //Here you have to provide 2 || 3 things
    <DATABASE_ID || DATABASE>,
    <COLLECTION_ID || SCHEMA>,
    <QUERY_AS_PER_YOUR_NEED>
)
```

```
🟠FOR UPDATING A DOCUMENT
const newDocument = appwrite.listDocuments(
    //Here you have to provide 4 things
    <DATABASE_ID || DATABASE>,
    <COLLECTION_ID || SCHEMA>,
    <DOCUMENT_ID>,
    <UPDATED_DATA_IN_KEY_VALUE_PAIR>
)
```

```
🔴FOR DELETING A DOCUMENT
const newDocument = appwrite.listDocuments(
    //Here you have to provide 3 things
    <DATABASE_ID || DATABASE>,
    <COLLECTION_ID || SCHEMA>,
    <DOCUMENT_ID>,
)
```
