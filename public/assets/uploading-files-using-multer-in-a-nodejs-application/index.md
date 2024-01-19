---
title: 'Uploading Files Using Multer in a Node.js Application'
date: '2021-01-18'
---

Whenever we submit a form on the client-side of any website, all the form data goes to the server-side. Usually, form-data gets encoded before we submit it to the server. We can do this by specifying the enctype attribute in the `<form>` tag in HTML. If we don't specify it, form-data gets encoded with the default type.
<br></br>

### Introduction
This is usually the case when we are dealing with text-only data like name, email, and password, etc.

But, if we are uploading some kind of files, we need to specify the enctype attribute with the value `multipart/form-data`. This value is required when we are using forms that have a file input type element.

Multer is an npm package that makes it easy to handle file uploads. It does it very efficiently, thus it is quite popular. In this article, we will see how to use Multer to handle multipart/form-data using Node.js, Express and MongoDB.

### Prerequisites
There are four things you should know/have installed before you attempt this tutorial.

1. Good understanding of HTML and CSS.

2. Node.js should be installed in your system and you should have a working knowledge of it.

3. MongoDB should be installed in your system and you should have a working knowledge of it.

4. Good understanding of the command-line or integrated terminals in code-editors.

Next, create a new HTML file and name it index.html. Inside it, we will add a form to upload files. Your HTML code should look something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      crossorigin="anonymous"
    />
    <!-- style.css file path in the line below. -->
    <link rel="stylesheet" href="css/style.css" />
    <!-- -------------------------------------- -->
    <title>Multer Tutorial</title>
  </head>
  <body>
    <main class="admin">
      <div class="admin__upload-file">
        <form action="#" enctype="multipart/form-data" method="post">
          <input type="file" class="admin__input" id="myFile" name="myFile" />
          <input class="admin__submit" type="submit" />
        </form>
      </div>
    </main>
  </body>
</html>
```