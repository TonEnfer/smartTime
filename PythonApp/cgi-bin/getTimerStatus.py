#!/usr/bin/env python3
import sys
import codecs
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
import json
import sqlite3
import requests
import cgi
print("Content-type: application/json\n")
#print("Content-type: text/html\n")
form = cgi.FieldStorage()
id = form.getfirst("id", '')
response = ''
if(id != ''):
	db = sqlite3.connect("../DB/db.sqlite")
	cursor = db.cursor()
	address = cursor.execute("select ip from Watchs where id = '{}'".format(id)).fetchall()
	db.close()
	if(len(address) != 0):
		address = address[0][0]
		try:
			response = requests.get(address+"/cgi-bin/getTimerStatus.py", timeout=1)
		except:
			pass
		else:
			if(response.status_code == 200):
				status = response.json()['timer']
				res = json.dumps({'timer':status})
				print(res)
