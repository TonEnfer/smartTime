#!/usr/bin/env python3

import sqlite3
import subprocess

db = sqlite3.connect("../DB/db.sqlite")
cursor = db.cursor()

cursor.execute('''CREATE TABLE Watchs
						(id text, ip text, name text)''')


db.commit()
db.close()