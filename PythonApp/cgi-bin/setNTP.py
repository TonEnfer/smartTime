#!/usr/bin/env python3

import cgi
import json
import sqlite3
import requests
form = cgi.FieldStorage()
id = form.getfirst("id", '')
ntp = form.getfirst("ntp", '')
if(id != '' and ntp != ''):
	db = sqlite3.connect("../DB/db.sqlite")
	cursor = db.cursor()
	address = cursor.execute("select ip from Watchs where id = '{}'".format(id)).fetchall()
	db.close()
	if(len(address) != 0):
		address = address[0][0]
		param = {'ntp':ntp}
		try:
			response = requests.post(address+"/cgi-bin/setNTP.py", data = param, timeout=1)
		except:
			pass
		else:
			if(response.status_code == 200):
				res = response.text
				print("Content-type: application/json\n")
				print(res)