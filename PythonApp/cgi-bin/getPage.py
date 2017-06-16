#!/usr/bin/env python3

import json
import sqlite3
import cgi

form = cgi.FieldStorage()
name = form.getfirst("name", '')

f = open("./" + name + ".html")
data = f.read();
f.close();

print("Content-type: text/html\n")
print(data)
