#!/usr/bin/env python3

import json
import sqlite3
import requests

db = sqlite3.connect("../DB/db.sqlite")
cursor = db.cursor()
result = "Not found"

watches = cursor.execute("select * from Watchs").fetchall()
db.close()
if(len(watches) != 0):
	result = '{"watches": [ '
	for w in watches:
		id,ip,name = [str(i) for i in w]
		resp = requests.get(ip+"/cgi-bin/getName.py",timeout = 1)
		if(resp.status_code == 200):
			result += '{'
			result += '"id":"{id_r}","ip":"{ip_r}","name":"{name_r}" '.format(id_r=id,ip_r=ip.split('/')[2],name_r=name)
			result += "}, "
	result = result[:-2] + "] }"

print("Content-type: application/json\n")
print(result)