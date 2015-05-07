#markdown-docs

Generates a static site from a directory of markdown files.

##Installation
```
npm install -g markdown-docs
```

##Usage
npm will make markdown-docs available as an executable.

###Build
Running the executable with the build command will generate the site from
the destination directory (the current directory by default) and write the site
to the directory specified by the source parameter (``./_site`` by default).

```
$ markdown-docs build
$ markdown-docs build --destination <destination>
$ markdown-docs build --source <source> --destination <destination>
```